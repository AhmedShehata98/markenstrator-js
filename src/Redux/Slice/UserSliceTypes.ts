import { userAllDataTypes } from "./../../Utilities/dummyUsers";

export type loginDataTypes = {
  email: string | "";
  password: string | "";
};
export type LoginPromiseResultType = {
  isAvaliable: boolean;
  data: userAllDataTypes | undefined;
  message: "login successfully" | "login failed user is not avaliable";
};
export type userDataTypes = {
  username: string;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  email: string;
  role: "string";
  phonenumber?: number;
};
export type initialStateTypes = {
  pending: boolean;
  isLoggedIn: boolean;
  userData?: userDataTypes | object;
};
export type loginAccontActionTypes = {
  payload: LoginPromiseResultType;
};
