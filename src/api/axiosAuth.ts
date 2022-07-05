import axios from "axios";

const axiosAuth = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_AUTH_SERVER_URL,
});


export default axiosAuth;