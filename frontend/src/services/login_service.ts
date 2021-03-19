import { post } from "./rest_service";
import { AuthToken } from "./auth_token";

export const COOKIES = {
  authToken: "myApp.authToken"
};


export async function login(data): Promise<string | void> {
  const res: any = await post("/login", data).catch(err => err);
  if (res.data.error) {
    return res.data.error;
  } else if (!res.data || !res.data.token) {
    return "Something went wrong!";
  }
  if (res.data && res.data.token) {
    alert(`this is my token: (${res.data.token})`);
    await AuthToken.storeToken(res.data.token);
  }
}