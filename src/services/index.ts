import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";

const api = axios.create({
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
const createAxiosRequest = <T>(
  url: string,
  method: string = "get",
  config?: AxiosRequestConfig
) => {
  const fn = (data?: any): Promise<AxiosResponse<T>> =>
    data
      ? selectApiMethod(method)(url, data, config)
      : selectApiMethod(method)(url, config);
  fn.url = url;
  return fn;
};

export const getLocale = createAxiosRequest<{ message: string }>("/locale");
