import axios from "axios";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  //baseURL: 'http://localhost:3000/api/',
});


export default axiosClient;