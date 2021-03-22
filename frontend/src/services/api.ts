import axios from "axios";
import authHeader from "./auth";

const api = axios.create({
  baseURL: "http://192.168.0.122:8080/api/v1.0",
});

export function getGames() {
  return api.get('/games', { headers: authHeader() });
}

export default api;