import {
  loginDataTypes,
  LoginPromiseResultType,
  initialStateTypes,
  loginAccontActionTypes,
  userDataTypes,
} from "./UserSliceTypes";
import { usersDatabase, userAllDataTypes } from "./../../Utilities/dummyUsers";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";

//

const initialState: initialStateTypes = {
  pending: false,
  isLoggedIn: Boolean(localStorage.getItem("LOGGED_IN"))
    ? JSON.parse(localStorage.getItem("LOGGED_IN")!)
    : false,
  userData: {},
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
    );
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
              message: "login failed user is not avaliable",
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
    LOGOUT_ACCOUNT: (state: initialStateTypes, actions: PayloadAction) => {},
  },
  extraReducers(builder) {
    builder.addCase(LOGIN_ACCOUNT_ACTION.pending, (state, _) => {
      state.pending = true;
      state.isLoggedIn = false;
      state.userData = {};
    });
    builder.addCase(LOGIN_ACCOUNT_ACTION.fulfilled, (state, actions) => {
      const { data, isAvaliable }: LoginPromiseResultType = actions.payload;
      state.pending = false;
      state.isLoggedIn = isAvaliable;
      state.userData = data;
      window.localStorage.setItem("LOGGED_IN", JSON.stringify(isAvaliable));
    });
    builder.addCase(LOGIN_ACCOUNT_ACTION.rejected, (state, actions) => {
      const payload: LoginPromiseResultType = actions.payload;
      state.pending = false;
      state.isLoggedIn = payload.isAvaliable;
      state.userData = payload.data;
    });
  },
});

export const { LOGOUT_ACCOUNT } = userSlice.actions;
