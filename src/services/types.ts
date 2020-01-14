export interface UserLoginModel {
  username: string;
  password: string;
}

export interface UserRegisterModel {
  username: string;
  email: string;
  email_confirmation: string;
  password: string;
  password_confirmation: string;
}

export interface SessionModel {
  token: string;
  refreshToken: string;
}

export interface UserDBModel {
  username: string;
  id: number;
  avatar_id: number | null;
}
export interface DecodedTokenModel {
  uid: number;
  data: UserDBModel;
}
