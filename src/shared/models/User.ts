import type { CartInfo } from "./Cart";

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  client: string;
}

export interface Userdata {
  id: string;
  firstname: string;
  lastname: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  city: string;
  street: string;
  streetNumb: number;
  userID: string;
  saveIt: string;
}

export interface UserState {
  user: User | null;
  userdata: Userdata | null;
  login: (email: string, password: string) => Promise<LoginInfo>;
  get_user_logged: () => void;
  logout: () => void;
  edit_userdata: (newUserdata: Userdata) => Promise<CartInfo>;
}

export interface LoginInfo {
  logged: boolean;
  message: string;
}
