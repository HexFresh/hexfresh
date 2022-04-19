import { NavigateFunction } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import rootStore, { IRootDispatch, IRootStore } from "../store";
import { retrieveStoredToken } from '../../utils/calc';
import { initSocket } from "../../utils/socketioInit";
import { notification } from "antd";

let logoutTimer: NodeJS.Timeout;
const initialState = {
	token: null,
	id: null,
	email: null,
	username: null,
	roleId: null,
}

export const user: any = {
	state: {
		...initialState
	},
	reducers: {
		loginSucces: (state: IRootStore, payload: any) => {
			return {
				...state,
				...payload.body,
				token: payload.token,
			}
		},
		retrieveToken: (state: IRootStore, payload: any) => {
			return {
				...state,
				token: payload,
			}
		},
		logout: (state: IRootStore) => { return { ...initialState } }

	},
	effects: (dispatch: IRootDispatch) => ({
		async signIn(
			{ email, password, navigate, preLocation
			}: {
				email: string, password: string, navigate: NavigateFunction, preLocation: string
			}
		) {
			const endpoint = `/auth/login`;
			try {
				const response = await axiosClient.post(endpoint, `username=${email}&password=${password}`);
				const { data } = response;
				dispatch.user.loginSucces({
					body: {
						...data.user
					},
					token: data.token,
				});

				// Copy to success
				const socket = initSocket(data.token);
				socket.emit('signin','Hi from signin')
				
				localStorage.setItem('token', data.token);
				sessionStorage.setItem("token", data.token as string)

				console.log(data);
				if (preLocation) {
					dispatch.location.arrivedStartLocation();
					navigate(preLocation, { replace: true });
				} else {
					navigate('/', { replace: true });
				}
			} catch (error) {
				notification.error({
          message:'Login failed!',
          description: error.message,
        });
				throw new Error('Failed to login.');
			}
		},
		runLogoutTimer({ dispatch, timer, navigate }: { dispatch: IRootDispatch, timer: number, navigate: NavigateFunction }) {
			logoutTimer = setTimeout(() => {
				this.signOut({ navigate });
			}, timer);
		},
		logoutHandlerAction({ dispatch, navigate }: { dispatch: IRootDispatch, navigate: NavigateFunction }) {
			if (logoutTimer) {
				clearTimeout(logoutTimer);
			}
			this.signOut({ navigate });
		},
		signOut({ navigate }: { navigate: NavigateFunction }) {
			dispatch.user.logout();
			navigate('/signin');
		},
		checkAutoLogin({ dispatch, navigate, location }: { dispatch: IRootDispatch, navigate: NavigateFunction, location: any }) {
			const tokenData = retrieveStoredToken();
			if (tokenData) {
				dispatch.user.retrieveToken(tokenData.token);
				const timer = tokenData.duration;
				this.runLogoutTimer({ dispatch, timer, navigate });
				navigate(location.pathname + location.search);
			}
		},
		async checkAutoLoginV2({ dispatch, navigate, location }: { dispatch: IRootDispatch, navigate: NavigateFunction, location: any }) {
			const endpoint = `program/1`;
			//const token = localStorage.getItem('token');
			const token = sessionStorage.getItem('token');

			if (token) {
				dispatch.user.retrieveToken(token);
			}

			try {
				const response = await axiosClient.get(endpoint);
				if (response.status === 200) {
					dispatch.user.loginSucces({
						token: response.data.token || 'qưertyuiopasdfghjkl'
					});

					const preLocation = rootStore.getState().location.location;

					if (preLocation) {
						navigate(`${rootStore.getState().location.location}`)
					} else {
						navigate('/');
					}
				}

			} catch (error) {
				this.signOut({ navigate });
				console.log(error, 'error');
			}

		}

	}),
}
export type IUserStore = typeof user;