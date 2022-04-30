import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootDispatch } from "../store/store";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: 'https://hexfresh-gamification-backend.herokuapp.com/api/',
  //baseURL: 'http://localhost:3000/api/',
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const originalConfig = error.config;
      if (originalConfig.url !== "/auth/signin" && error.response) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._ret = true;
          try {
            /* const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data; */
           /*  dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken); */
            // return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
  return Promise.reject(error.message);
});

export default axiosClient;