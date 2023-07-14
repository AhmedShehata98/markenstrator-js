import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, ENDPOINTS } from "./apiSettings";

export const shoperzAPI = createApi({
  reducerPath: "shoperzApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getUserData: builder.mutation({
      query: (token: string) => ({
        url: ENDPOINTS.user.me,
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
    }),
    signup: builder.mutation({
      query: (payload) => ({
        url: ENDPOINTS.auth.signup,
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: ENDPOINTS.auth.login,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
export const { useSignupMutation, useGetUserDataMutation, useLoginMutation } =
  shoperzAPI;
