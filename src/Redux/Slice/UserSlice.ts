import {
  loginDataTypes,
  LoginPromiseResultType,
  IinitialState,
  IUserData,
} from "./UserSliceTypes";
import { usersDatabase, userAllDataTypes } from "../../Utilities/dummyData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

//

const initialState: IinitialState = {
  pending: false,
  isLoggedIn: Boolean(sessionStorage.getItem("LOGGED_IN"))
    ? JSON.parse(sessionStorage.getItem("LOGGED_IN")!)
    : false,
  userData: Boolean(window.sessionStorage.USER_DATA)
    ? JSON.parse(sessionStorage.USER_DATA)
    : {},
  isError: "idle",
  isSuccess: "idle",
  successMessage: "",
  errorMessage: "",
};

async function SimulateLoggin(
  loginData: loginDataTypes,
  db: userAllDataTypes[],
  timer: number
): Promise<LoginPromiseResultType> {
  return await new Promise((resolve, reject) => {
    const matchData = db.find(
      (data, index) =>
        data.email === loginData.email && data.password === loginData.password
    ) as IUserData;
    Boolean(matchData)
      ? setTimeout(
          () =>
            resolve({
              isAvaliable: true,
              data: matchData,
              message: "login successfully",
            }),
          timer
        )
      : setTimeout(
          () =>
            reject({
              isAvaliable: false,
              data: {},
              message: "incorrect ,email or password ",
            }),
          timer
        );
  });
}

export const LOGIN_ACCOUNT_ACTION = createAsyncThunk(
  "user/login",
  async function (
    loginData: loginDataTypes,
    thunkapi
  ): Promise<LoginPromiseResultType> {
    const { rejectWithValue } = thunkapi;
    try {
      const response = await SimulateLoggin(loginData, usersDatabase, 1500);
      return await response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGOUT_ACCOUNT: (state: IinitialState, actions: PayloadAction) => {
      state.pending = false;
      state.isError = "idle";
      state.isSuccess = "idle";
      state.successMessage = "";
      state.errorMessage = "";
      state.userData = {};
      state.isLoggedIn = false;
      window.sessionStorage.LOGGED_IN &&
        window.sessionStorage.setItem("LOGGED_IN", JSON.stringify(false));
      window.sessionStorage.USER_DATA &&
        window.sessionStorage.setItem("USER_DATA", JSON.stringify({}));
    },
    BACK_INITIAL_STATE: (state: IinitialState, actions: PayloadAction) => {
      state.pending = false;
      state.isError = "idle";
      state.isSuccess = "idle";
      state.successMessage = "";
      state.errorMessage = "";
      state.userData = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(LOGIN_ACCOUNT_ACTION.pending, (state, _) => {
      state.pending = true;
      state.isLoggedIn = false;
      state.isSuccess = "idle";
      state.isError = "idle";
      state.errorMessage = "";
      state.successMessage = "";
      state.userData = {};
    });
    builder.addCase(
      LOGIN_ACCOUNT_ACTION.fulfilled,
      (state, actions: PayloadAction<LoginPromiseResultType>) => {
        state.pending = false;
        state.isLoggedIn = actions.payload.isAvaliable;
        state.isError = "idle";
        state.errorMessage = "";
        state.isSuccess = true;
        state.successMessage = actions.payload.message;
        state.userData = actions.payload.data || {};
        window.sessionStorage.setItem(
          "USER_DATA",
          JSON.stringify(actions.payload.data)
        );
        window.sessionStorage.setItem(
          "LOGGED_IN",
          JSON.stringify(actions.payload.isAvaliable)
        );
      }
    );
    builder.addCase(LOGIN_ACCOUNT_ACTION.rejected, (state, actions) => {
      const payload = actions.payload as LoginPromiseResultType;
      state.pending = false;
      state.isError = true;
      state.successMessage = "";
      state.isSuccess = "idle";
      state.errorMessage = payload.message;
      state.isLoggedIn = payload.isAvaliable;
      state.userData = {};
    });
  },
});

export const { LOGOUT_ACCOUNT, BACK_INITIAL_STATE } = userSlice.actions;
