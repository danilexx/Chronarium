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
  login: thunk(async (actions, payload) => {
    const response = await createSession(payload);
    const { token, refreshToken } = response.data;
    cookie.save("token", token, { path: "/" });
    cookie.save("refresh_token", refreshToken, { path: "/" });
    actions.setUser({ token });
  }),
  register: thunk(async (actions, payload) => {
    const response = await createUser(payload);
  })
};

export default user;
