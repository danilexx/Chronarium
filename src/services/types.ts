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

export interface Avatar {
  path: url;
}

export interface UserDBModel {
  username: string;
  id: number;
  avatar_id: number | null;
  avatar: null | Avatar;
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
  avatar_id: number | null;
}

export interface AdventureModel {
  id: number;
  name: string;
  owner_id: number;
  hasPassword: boolean;
  description: string;
  avatar?: Avatar;
  lobby: Lobby;
}

interface AdventureOptions {
  default_mana: number;
  default_life: number;
  default_gold: number;
  default_attributes_points_to_spend: number;
  default_base_expertise: number;
  default_melee_expertise: number;
  default_ranged_expertise: number;
  default_magic_expertise: number;
  default_miracle_expertise: number;
}

interface Lobby {
  id: number;
  maxPlayers: number;
}

export interface AdventureCreatingModel {
  options: AdventureOptions;
  name: string;
  description: string;
  password?: string;
  maxPlayers: number;
  avatar_id: number | null;
}

export interface Character {
  name: string;
  user: User;
}

export interface Master {
  name: string;
  user: User;
}

export interface Message {
  message: string;
  id: number;
  character: null | Character;
  master: null | Master;
}
