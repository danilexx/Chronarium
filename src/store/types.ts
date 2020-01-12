import { Thunk, Action } from "easy-peasy";
import { UserRegisterModel, UserLoginModel } from "../services/types";

// The interface representing our Todos model
export interface UserModel {
  isLogged: boolean;
  token: string | null;
  id: number | null;
  register: Thunk<UserModel, UserRegisterModel>;
  login: Thunk<UserModel, UserLoginModel>;
  setUser: Action<
    UserModel,
    {
      token: string;
      id: number;
    }
  >;
}

// The interface representing our entire store model
export interface StoreModel {
  user: UserModel;
}
