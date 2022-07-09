import axios from "axios";
import { set } from "lodash";
import { IStore } from "../store/store";
import axiosAuth from "./axiosAuth";
import axiosClient from "./axiosClient";
import axiosMessage from "./axiosMessage";
import tokenService, { getLocalAccessToken } from "./token-service";

const setup = (store: IStore) => {

  // Add a request interceptor
  axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      set(config, [ 'headers', 'Authorization' ], 'Bearer ' + token)
      // set(config, [ 'headers', 'x-access-token' ], token) // for Node.js Express back-end
    }
    return config;
  }, async (error) => {

    return Promise.reject(error);
  });

  const { dispatch } = store;
  // Add a response interceptor
  axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalConfig = error.config;

    if (originalConfig.url !== "/auth/signin" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._ret = true;
        dispatch.user.setLoadingState(true);
        try {
          const rs = await axiosAuth.get("/auth/refresh-token");
          const { token, user } = rs.data;

          dispatch.user.loginSucces({
            body: {
              ...user
            },
            token,
          });
          tokenService.updateLocalAccessToken(token);
          dispatch.user.setLoadingState(false);

          return axiosClient(originalConfig);

        } catch (_error) {
          dispatch.user.setLoadingState(false);

          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error.message);
  });


  // Axios Message
  // Add a request interceptor
  axiosMessage.interceptors.request.use(function (config) {
    const token = getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      set(config, [ 'headers', 'Authorization' ], 'Bearer ' + token)
      // set(config, [ 'headers', 'x-access-token' ], token) // for Node.js Express back-end
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axiosMessage.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalConfig = error.config;

    if (originalConfig.url !== "/auth/signin" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._ret = true;
        dispatch.user.setLoadingState(true);
        try {
          const rs = await axiosAuth.get("/auth/refresh-token");
          const { token, user } = rs.data;

          dispatch.user.loginSucces({
            body: {
              ...user
            },
            token,
          });
          tokenService.updateLocalAccessToken(token);
          dispatch.user.setLoadingState(false);

          return axiosMessage(originalConfig);

        } catch (_error) {
          dispatch.user.setLoadingState(false);
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error.message);
  });

}

export default setup;