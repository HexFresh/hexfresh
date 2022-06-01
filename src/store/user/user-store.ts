import { NavigateFunction } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import rootStore, { IRootDispatch, IRootStore } from "../store";
import { retrieveStoredToken } from '../../utils/calc';
import { socketInstance } from "../../utils/socketioInit";
import { notification } from "antd";
import { setAuthToken } from "../../api/axiosMessage";
import { DoorSlidingOutlined } from "@mui/icons-material";

let logoutTimer: NodeJS.Timeout;
const initialState = {
  token: null,
  id: null,
  email: null,
  username: null,
  roleId: null,
  users: [],
  isFetchingUsers: false,
}

export const user: any = {
  state: {
    ...initialState
  },
  reducers: {
    loginSucces: (state: IRootStore, payload: any) => {
      const socket = socketInstance;
      socket.io.opts.query = "token=" + payload.token as any;
      console.log("🚀 ~ file: user-store.ts ~ line 29 ~ payload.token", payload.token)
      socket.connect();
      socket.emit('signin', 'Hi from signin')
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
    logout: (state: IRootStore) => {
      return { ...initialState }
    },

    setUsers: (state: IRootStore, payload: any) => ({ ...state, users: payload }),
    setIsFetchingUsers: (state: IRootStore, payload: any) => ({ ...state, isFetchingUsers: payload }),

  },
  effects: (dispatch: IRootDispatch) => ({
    async signIn(
      {
        email, password, navigate, preLocation
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

        //set token for axios message
        setAuthToken(data.token);

        // Copy to success

        await dispatch.user.fetchProfileUsers();

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        sessionStorage.setItem("token", data.token as string)
        localStorage.setItem("roleId", data.user.roleId as string)

        if (preLocation) {
          dispatch.location.arrivedStartLocation();
          navigate(preLocation, { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {

        notification.error({
          message: 'Login failed!',
          description: error.message,
        });
        throw new Error('Failed to login.');
      }
    },
    runLogoutTimer({
      dispatch,
      timer,
      navigate
    }: { dispatch: IRootDispatch, timer: number, navigate: NavigateFunction }) {
      logoutTimer = setTimeout(() => {
        this.signOut({ navigate });
      }, timer);
    },
    logoutHandlerAction({ dispatch, navigate }: { dispatch: IRootDispatch, navigate: NavigateFunction }) {
      logoutTimer && clearTimeout(logoutTimer);
      localStorage.clear();
      socketInstance.close();
      this.signOut({ navigate });
    },
    signOut({ navigate }: { navigate: NavigateFunction }) {
      dispatch.user.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      sessionStorage.removeItem("token");
      localStorage.removeItem("roleId");
      localStorage.removeItem("_grecaptcha")
      navigate('/signin', { replace: true });
    },
    checkAutoLogin({
      dispatch,
      navigate,
      location
    }: { dispatch: IRootDispatch, navigate: NavigateFunction, location: any }) {
      const tokenData = retrieveStoredToken();
      if (tokenData) {
        dispatch.user.retrieveToken(tokenData.token);
        const timer = tokenData.duration;
        this.runLogoutTimer({ dispatch, timer, navigate });
        navigate(location.pathname + location.search);
      }
    },
    async checkAutoLoginV2({
      dispatch,
      navigate,
      location
    }: { dispatch: IRootDispatch, navigate: NavigateFunction, location: any }) {
      const endpoint = `program/1`;
      //const token = localStorage.getItem('token');
      const token = sessionStorage.getItem('token');

      if (token) {
        dispatch.user.retrieveToken(token);
      }

      try {
        const response = await axiosClient.get(endpoint);
        if (response.status === 200) {

          const accessToken = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
          if (accessToken) {
            //set token for axios message
            setAuthToken(accessToken);

            const socket = socketInstance;
            socket.io.opts.query = "token=" + accessToken as any;
            socket.emit('signin', 'Auto sign in');
          } else {
            console.log('no access token');
          }
          dispatch.user.loginSucces({
            token: accessToken || 'ẻdtafygsuhijdeiyfuiwuyefv',
            userId
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

    },

    async fetchProfileUsers() {
      const endpoint = `user`;

      try {
        const response = await axiosClient.get(endpoint);

        dispatch.user.setUsers(response.data?.rows);

      } catch (error) {
        console.log(error);
      }
    },

    async doLogOut() {
      const endpoint = 'auth/logout';

      try {
        await axiosClient.get(endpoint);
      } catch (error) {
        notification.error({
          description: error,
          message: 'Log out failed.'
        });
      }
    },

  }),
}
export type IUserStore = typeof user;