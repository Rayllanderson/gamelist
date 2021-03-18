import axios, { AxiosRequestConfig } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:8080",
};

export const post = (url: string, data: URLSearchParams) => {
  return axios.post(url, data, baseConfig).catch(err => err.response);
};

export const get = async (url: string) => {
  return await axios.get(url).catch(err => err.response);
};
