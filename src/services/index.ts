/* eslint-disable no-shadow */
import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import cookies from "next-cookies";
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
  AdventureCreatingModel,
  Message,
  PendingFriend
} from "./types";

export const api = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookie.load("token")}`,
    Accept: "application/json"
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
    case "delete": {
      return api.delete;
    }
    default:
      return api.get;
  }
};
const createAxiosRequest = <T, D = any>(
  url: string,
  method: string = "get",
  extraConfig?: AxiosRequestConfig
) => {
  const fn = (data?: D): Promise<AxiosResponse<T>> => {
    const baseConfig = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`
      }
    };
    const config = { ...baseConfig, ...extraConfig };
    return data
      ? selectApiMethod(method)(url, data, config)
      : selectApiMethod(method)(url, config);
  };
  fn.url = url;
  return fn;
};
const createAxiosServerAuthRequest = <T, D = any>(
  url: string,
  method: string = "get",
  extraConfig?: AxiosRequestConfig
) => {
  const fn = (context: any, data?: D): Promise<AxiosResponse<T>> => {
    const { token } = cookies(context);
    const baseConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const config = { ...baseConfig, ...extraConfig };
    return data
      ? selectApiMethod(method)(url, data, config)
      : selectApiMethod(method)(url, config);
  };
  fn.url = url;
  return fn;
};

export const getLocale = createAxiosRequest<{ message: string }>("/locale");
export const createSession = createAxiosRequest<any, UserLoginModel>(
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

export const uploadImage = createAxiosRequest<{ id: number }, FormData>(
  "/files",
  "post"
);

export const createAdventure = (master_id: number) =>
  createAxiosRequest<AdventureModel, AdventureCreatingModel>(
    `/masters/${master_id}/adventures`,
    "post"
  );

export const getAdventures = createAxiosRequest<AdventureModel[]>(
  `/adventures`,
  "get"
);
export const getMyMasteringAdventures = createAxiosServerAuthRequest<
  AdventureModel[]
>(`/masters/adventures`, "get");
export const getMyAdventures = createAxiosRequest<AdventureModel[]>(
  `/users/adventures`,
  "get"
);

export const getAdventure = (adventureId: number) =>
  createAxiosServerAuthRequest(`/adventures/${adventureId}`, "get");

export const getMessages = (adventureId: number) =>
  createAxiosRequest(`/adventures/${adventureId}/social_messages`);
export const sendMessage = (adventureId: number) =>
  createAxiosRequest(`/adventures/${adventureId}/social_messages`, "post");

export const addFriend = createAxiosRequest<any, { username: string }>(
  "/pending_friendships",
  "post"
);

export const getPendingFriends = createAxiosRequest<PendingFriend[]>(
  "/pending_friendships"
);

export const acceptFriendshipRequest = createAxiosRequest<
  any,
  { to_add_user_id: number; pending_friendship_id }
>("/friendships", "post");

export const denyFriendshipRequest = (id: number) =>
  createAxiosRequest(`/pending_friendships/${id}`, "delete");

export const getFriends = createAxiosRequest("/friendships");

export const removeFriend = (to_delete_user_id: number) =>
  createAxiosRequest(`/friendships/${to_delete_user_id}`, "delete");

export const invitePlayer = createAxiosRequest<
  any,
  {
    receiver_id: number;
    adventure_id: number;
    as: "character" | "master";
  }
>("/pending_adventures", "post");

export const getPendingAdventures = createAxiosRequest<any>(
  "/pending_adventures"
);

export const acceptAdventureRequest = createAxiosRequest<
  any,
  {
    master_name: null | string;
    pending_adventure_id: number;
  }
>("/adventure_lobbies", "post");
export const denyAdventureRequest = (id: number) =>
  createAxiosRequest<any>(`/pending_adventures/${id}`, "delete");

export const createSkill = (adventrureId: number) =>
  createAxiosRequest<any>(`/adventures/${adventrureId}/skills`, "post");

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
