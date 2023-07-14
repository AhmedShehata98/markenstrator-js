import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../services/apiSettings";
import {
  Login,
  LoginResponse,
  Signup,
  SignupError,
  SignupSuccess,
  UserData,
} from "../../types";

// Fetchers methods
const accountLogin = async ({
  email,
  password,
}: Login): Promise<LoginResponse> => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.auth.login,
      data: {
        email,
        password,
      },
    });

    const data = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const accountSignup = async ({
  email,
  fullname,
  password,
  phone,
}: Signup): Promise<SignupSuccess | SignupError> => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.auth.signup,
      data: { email, fullname, password, phone },
    });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getUserData = async (token: string): Promise<UserData> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      headers: {
        Authorization: token,
      },
    });
    const data = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { accountLogin, accountSignup, getUserData };
