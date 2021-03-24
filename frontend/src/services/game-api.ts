import { Game } from "../contexts/GameContext";
import api from "./api";
import authHeader from "./auth";

export default class GameApi {

  findAll() {
    return api.get('/games', { headers: authHeader() });
  }

  post(data: Omit<Game, 'id'>) {
    return api.post('/games', data, { headers: authHeader() });
  }

  findById(id: string) {
    return api.get('/games/' + id, { headers: authHeader() });
  }

  put(id: string, data: Omit<Game, 'id'>) {
    return api.put('/games/' + id, data, { headers: authHeader() });
  }

  delete(id: string) {
    return api.delete('/games/' + id, { headers: authHeader() });
  }

  findByStatus(url: string) {
    return api.get('/games/status' + url, { headers: authHeader() });
  }

  findByName(query: string) {
    return api.get('/games/search?q=' + query, { headers: authHeader() });
  }

  get(url:string) {
    return api.get('/' + url, { headers: authHeader() });
  }
}