import { createStore } from "easy-peasy";
import { StoreModel } from "./types";
import { user } from "./models";

export const storeStructure: StoreModel = {
  user
};

export const makeStore = (initialState: StoreModel, options: any) => {
  const store = createStore(storeStructure, { initialState });
  return store;
};
