import { thunk, action } from "easy-peasy";
import JwtDecode from "jwt-decode";
import { UserModel } from "../types";
import { api, createSession, createUser } from "-/src/services";

const user: UserModel = {
  isLogged: false,
  token: null,
  id: null,
  setUser: action((state, payload) => {
    state.isLogged = true;
    state.token = payload.token;
    state.id = payload.id;
  }),
  login: thunk(async (actions, payload) => {
    const response = await createSession(payload);
    const { token } = response.data;
    const { uid: id } = JwtDecode(token);
    actions.setUser({ token, id });
  }),
  register: thunk(async (actions, payload) => {
    const response = await createUser(payload);
  })
};

export default user;
