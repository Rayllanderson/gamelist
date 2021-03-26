import api from "./api";
import authHeader from "./auth";

interface UserPuTData {
  name: string;
  username: string;
  email?: string;
}

export default class UserController {

  put(url: string, data: UserPuTData) {
    return api.put('/users/' + url, data, { headers: authHeader() });
  }

  get(url: string) {
    return api.get('/users/' + url, { headers: authHeader() });
  }

  getUserDetails() {
    return api.get('/users/details', { headers: authHeader() });
  }
}
