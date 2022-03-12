import { NavigateFunction } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { IRootDispatch, IRootStore } from "../store";
import { retrieveStoredToken } from '../../utils/calc';


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
			console.log(email, password);
			try {
				//const response = await axiosClient.post(endpoint, `username=admin&password=123`);
				//console.log(response, 'response');

				const expirationTime = new Date(
					new Date().getTime() + 10 * 1000,
				);

				localStorage.setItem('token', 'QWERTYUIOPASDFGHJKLWQERTYUIOPASDFGHJKL');
				localStorage.setItem('expirationTime', expirationTime.toISOString());
				const timer = 10000;

				this.runLogoutTimer({ dispatch, timer, navigate })

				dispatch.user.loginSucces({
					body: {
						id: '',
						email: '123',
						username: 'admin',
						roleId: 'ADMIN',
					}, token: 'QWERTYUIOPASDFGHJKLWQERTYUIOPASDFGHJKL'
				});

				if (preLocation) {
					dispatch.locationStore.arrivedStartLocation();
					navigate(preLocation, { replace: true });
				} else {
					navigate('/', { replace: true });
				}
			} catch (error) {
				console.log(error);
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
			localStorage.removeItem('token');
			localStorage.removeItem('expirationTime');
			dispatch.user.logout();
			//navigate('/signin');
		},
		checkAutoLogin({ dispatch, navigate, location }: { dispatch: IRootDispatch, navigate: NavigateFunction, location: any }) {
			const tokenData = retrieveStoredToken();
			if (tokenData) {
				dispatch.user.retrieveToken(tokenData.token);
				const timer = tokenData.duration;
				this.runLogoutTimer({ dispatch, timer, navigate });
				navigate(location.pathname + location.search);
				console.log('here');
			}
		}

	}),
}
export type IUserStore = typeof user;