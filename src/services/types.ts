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

export interface MasterModel {
  name: string;
  id: number;
  user_id: number;
}

export interface MasterCreatingModel {
  name: string;
}

export interface AdventureModel {
  id: number;
  name: string;
  owner_id: number;
  hasPassword: boolean;
}

interface AdventureOptions {
  default_mana: number;
  default_life: number;
  default_gold: number;
  default_attributes_points_to_spend: number;
  default_base_experience_value: number;
  default_melee_experience_value: number;
  default_ranged_experience_value: number;
  default_magic_experience_value: number;
  default_miracle_experience_value: number;
}

export interface AdventureCreatingModel {
  options: AdventureOptions;
  name: string;
  password?: string;
  maxPlayers: number;
  icon_id?: number;
}
