import api from "./api";
import authHeader from "./auth";

export interface UserPuTData {
  name: string;
  email?: string;
}

export default class UserController {

  put(url: string, data: UserPuTData) {
    return api.put('/users/' + url, data, { headers: authHeader() });
  }

  updatePassword(password: string) {
    return api.put('/users/update/password', {
      password: password
    }, { headers: authHeader() });
  }

  get(url: string) {
    return api.get('/users/' + url, { headers: authHeader() });
  }

  getUserDetails() {
    return api.get('/users/user-details', { headers: authHeader() });
  }
}
