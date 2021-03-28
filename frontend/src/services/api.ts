import axios from "axios";

const api = axios.create({
  baseURL: "https://rayllanderson-game-list.herokuapp.com/api/v1.0",
});

export default api;