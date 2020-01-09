import { createStore, action } from "easy-peasy";
// The interface representing our Todos model
interface UserModel {
  isLogged: boolean;
  token: string | null;
}

// The interface representing our entire store model
export interface StoreModel {
  user: UserModel;
}
const user: UserModel = {
  isLogged: false,
  token: null
};
const storeStructure: StoreModel = {
  user
};

export const makeStore = (initialState: StoreModel, options: any) => {
  const store = createStore(storeStructure, { initialState });
  return store;
};
