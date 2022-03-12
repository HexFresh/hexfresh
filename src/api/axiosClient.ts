import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers:{
    'Access-Control-Allow-Origin':'*',
    "Access-Control-Allow-Methods": "*"
  }
});

export default axiosClient;