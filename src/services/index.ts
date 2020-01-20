/* eslint-disable no-shadow */
import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import cookie from "react-cookies";
import Router from "next/router";
import {
  UserLoginModel,
  UserRegisterModel,
  SessionModel,
  UserDBModel,
  MasterModel,
  MasterCreatingModel,
  AdventureModel,
  AdventureCreatingModel
} from "./types";

export const api = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    Authorization: `Bearer ${cookie.load("token")}`
  }
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
    case "put": {
      return api.put;
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
export const createSession = createAxiosRequest<SessionModel, UserLoginModel>(
  "/sessions",
  "post"
);
export const createUser = createAxiosRequest<UserDBModel, UserRegisterModel>(
  "/users",
  "post"
);
export const getNewToken = createAxiosRequest<
  SessionModel,
  { refresh_token: string }
>("/sessions", "put");

export const createMaster = createAxiosRequest<
  MasterModel,
  MasterCreatingModel
>("/masters", "post");

export const createAdventure = (master_id: number) =>
  createAxiosRequest<AdventureModel, AdventureCreatingModel>(
    `/masters/${master_id}/adventures`,
    "post"
  );
// api.interceptors.response.use(
//   response => {
//     // Return a successful response back to the calling service
//     return response;
//   },
//   error => {
//     // Return any error which is not due to authentication back to the calling service
//     if (error.response.status !== 401) {
//       return new Promise((resolve, reject) => {
//         reject(error);
//       });
//     }

//     // Logout user if token refresh didn't work or user is disabled
//     if (
//       error.config.url === "/sessions"
//     ) {
//       cookie.remove("token");
//       Router.push("/");

//       return new Promise((resolve, reject) => {
//         reject(error);
//       });
//     }

//     // Try request again with new token
//     return getNewToken(cookie.load("refresh_token"))
//       .then(data => {
//         const {
//           data: { token }
//         } = data;
//         // New request with new token
//         const { config } = error;
//         config.headers.Authorization = `Bearer ${token}`;

//         return new Promise((resolve, reject) => {
//           api
//             .request(config)
//             .then(response => {
//               resolve(response);
//             })
//             .catch((error: any) => {
//               reject(error);
//             });
//         });
//       })
//       .catch((error: any) => {
//         Promise.reject(error);
//       });
//   }
// );
