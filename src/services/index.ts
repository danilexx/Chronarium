import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import { UserLoginModel, UserRegisterModel } from "./types";

export const api = axios.create({
  baseURL: process.env.SERVER_URL
});
type get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<R>;
type post = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<R>;

type Method = get & post;

const selectApiMethod = (method: string): Method => {
  switch (method) {
    case "get": {
      return api.get;
    }
    case "post": {
      return api.post;
    }
    default:
      return api.get;
  }
};
const createAxiosRequest = <T, D = any>(
  url: string,
  method: string = "get",
  config?: AxiosRequestConfig
) => {
  const fn = (data?: D): Promise<AxiosResponse<T>> =>
    data
      ? selectApiMethod(method)(url, data, config)
      : selectApiMethod(method)(url, config);
  fn.url = url;
  return fn;
};

export const getLocale = createAxiosRequest<{ message: string }>("/locale");
export const createSession = createAxiosRequest<
  { token: string },
  UserLoginModel
>("/sessions", "post");
export const createUser = createAxiosRequest<UserLoginModel, UserRegisterModel>(
  "/users",
  "post"
);
