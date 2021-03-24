import api from "./api";
import authHeader from "./auth";

export interface PostGameData {
  name: string;
  status: string;
}

export default class ApiGame {

  findAll() {
    return api.get('/games', { headers: authHeader() });
  }

  post(data: PostGameData) {
    return api.post('/games', data, { headers: authHeader() });
  }

  findById(id: string) {
    return api.get('/games/' + id, { headers: authHeader() });
  }

  put(id: number, data: PostGameData) {
    return api.put('/games/' + id, data, { headers: authHeader() });
  }

  delete(id: number) {
    return api.delete('/games/' + id, { headers: authHeader() });
  }

  findByStatus(url: string) {
    return api.get('/games/status' + url, { headers: authHeader() });
  }

  findByName(query: string) {
    return api.get('/games/search?q=' + query, { headers: authHeader() });
  }
}