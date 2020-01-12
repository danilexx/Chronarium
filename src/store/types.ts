// The interface representing our Todos model
export interface UserModel {
  isLogged: boolean;
  token: string | null;
}

// The interface representing our entire store model
export interface StoreModel {
  user: UserModel;
}
