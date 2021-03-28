import axios from "axios";

const api = axios.create({
  //http://192.168.0.122:8080/api/v1.0
  baseURL: "https://rayllanderson-game-list.herokuapp.com/api/v1.0",
});

export default api;