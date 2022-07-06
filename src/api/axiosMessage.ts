import axios from "axios";

const axiosMessage = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_CHAT_SERVER_URL,
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosMessage.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosMessage.defaults.headers.common.Authorization;
  }
};
export default axiosMessage;