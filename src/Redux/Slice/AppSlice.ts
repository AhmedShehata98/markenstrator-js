import { RootState } from "./../Store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

type initialStateTypes = {
  loading: boolean;
  currentTheme: string | null;
  showSidebar: boolean;
};
type actionTypes = {
  payload?: "string";
  type?: string;
};
type setTitleActionType = {
  payload: {
    title: string | "Marketify";
  };
};
const initialState: initialStateTypes = {
  loading: true,
  currentTheme: Boolean(window.localStorage.getItem("themeMode"))
    ? window.localStorage.getItem("themeMode")
    : "light",
  showSidebar: false,
};
export const appSlice = createSlice({
  name: "app-settings",
  initialState,
  reducers: {
    TOGGLE_THEME: (state, action: actionTypes) => {
      const htmlElement = window.document.documentElement as HTMLHtmlElement;
      //
      // Toggling Theme class in HTML element
      if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
      } else {
        htmlElement.classList.remove("light");
        htmlElement.classList.add("dark");
      }
      //
      // Storing theme in LocalStoreage
      window.localStorage.setItem("themeMode", htmlElement.className.trim());
      state.currentTheme = htmlElement.className.trim();
    },
    TOGGLE_SIDEBAR: (state, action: actionTypes) => {
      state.showSidebar = !state.showSidebar;
    },
    SET_PAGE_TITLE: (_, action: setTitleActionType) => {
      window.document.title = `Marketify - ${action.payload.title}`;
    },
  },
});

export const { TOGGLE_THEME, TOGGLE_SIDEBAR, SET_PAGE_TITLE } =
  appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppSettings = (state: RootState) => state["app-settings"];
