import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.122:8080/api/v1.0",
});

export default api;