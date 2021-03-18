import Router from "next/router";
import { post } from "./rest_service";

export async function login(data): Promise<string | void> {
  const res: any = await post("/api/v1.0/login", data).catch(err => err);
  if (res.data.error) {
    return res.data.error;
  } else if (!res.data || !res.data.token) {
    return "Something went wrong!";
  }
  await Router.push("/mainpage");
}