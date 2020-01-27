import { thunk, action } from "easy-peasy";
import JwtDecode from "jwt-decode";
import cookie from "react-cookies";
import { UserModel } from "../types";
import { api, createSession, createUser } from "-/src/services";
import { DecodedTokenModel } from "-/src/services/types";

const user: UserModel = {
  isLogged: false,
  token: null,
  id: null,
  username: "",
  setUser: action((state, payload) => {
    state.isLogged = true;
    const {
      uid: id,
      data: { username }
    } = JwtDecode<DecodedTokenModel>(payload.token);
    state.token = payload.token;
    state.id = id;
    state.username = username;
  }),
  logout: action((state, payload) => {
    state.token = null;
    state.id = null;
    state.username = "";
    state.isLogged = false;
    cookie.remove("token");
    cookie.remove("refresh_token");
  }),
  login: thunk(async (actions, payload) => {
    const response = await createSession(payload);
    // const { data } = response;
    cookie.save("token", response.data.token, { path: "/" });
    cookie.save("refresh_token", response.data.refreshToken, { path: "/" });
    actions.setUser({ token: response.data.token });
  }),
  register: thunk(async (actions, payload) => {
    const response = await createUser(payload);
    actions.login({
      password: payload.password,
      username: payload.username
    });
  })
};

export default user;
