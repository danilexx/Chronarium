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
}

export interface DecodedTokenModel {
  id: number;
}
