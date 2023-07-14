type ApiResponse = {
  message: string;
  data: null;
  error: null;
};

/**
 *
 * User Auth
 */
type UserData = {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
};
type Signup = {
  fullname: string;
  phone: string;
  email: string;
  password: string;
};

type SignupError = {
  data: null | {};
  error: Array<{
    field: string;
    error: Array<{
      message: string;
      context: { key: string; label: string; limit: number; value: string };
      path: Array<string>;
      type: string;
    }>;
  }>;
  message: string;
};

type SignupSuccess = {
  message: string;
  data: { token: string };
  error: null | string;
};

interface LoginResponse extends ApiResponse {
  data: { token: string };
}

export type Login = {
  email: string;
  password: string;
};
