import { ISettingProfile } from "../../Types/pages-types";
import { userAllDataTypes } from "../../Utilities/dummyData";

export type loginDataTypes = {
  email: string | "";
  password: string | "";
};
export type LoginPromiseResultType = {
  isAvaliable: boolean;
  data: Partial<IUserData>;
  message: "login successfully" | "login failed user is not avaliable";
};
export interface IUserData extends Partial<ISettingProfile> {
  username: string;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  email: string;
  role: string;
  phonenumber?: number;
}
export interface IinitialState {
  pending: boolean;
  isLoggedIn: boolean;
  userData: Partial<IUserData>;
  isError: boolean | "idle";
  isSuccess: boolean | "idle";
  successMessage: string;
  errorMessage: string;
}
export type loginAccontActionTypes = {
  payload: LoginPromiseResultType;
};
