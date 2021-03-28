import axios from "axios";

const api = axios.create({
  baseURL: "localhost:8080/api/v1.0",
});

export default api;