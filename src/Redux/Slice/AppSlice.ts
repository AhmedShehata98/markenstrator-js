import { RootState } from "./../Store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { IProductFormData } from "../../Types/pages-types";

type initialStateTypes = {
  loading: boolean;
  currentTheme: string | null;
  showSidebar: boolean;
  initinalProductsData: Partial<IProductFormData>;
  displayProductDetails: boolean;
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
  initinalProductsData: {},
  displayProductDetails: false,
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
        htmlElement.classList.replace("dark", "light");
      } else {
        htmlElement.classList.replace("light", "dark");
      }
      //
      // Storing theme in LocalStoreage
      window.localStorage.setItem("themeMode", htmlElement.classList[0].trim());
      state.currentTheme = htmlElement.classList[0].trim();
    },
    TOGGLE_SIDEBAR: (state, action: actionTypes) => {
      state.showSidebar = !state.showSidebar;
    },
    SET_PAGE_TITLE: (_, action: setTitleActionType) => {
      window.document.title = `Marketify - ${action.payload.title}`;
    },
    SET_ADD_PRODUCT_INITIAL_STATE: (
      state: initialStateTypes,
      action: PayloadAction<{
        data: IProductFormData;
        displayProductDetails: boolean;
      }>
    ) => {
      state.initinalProductsData = action.payload.data;
      state.displayProductDetails = action.payload.displayProductDetails;
    },
  },
});

export const {
  TOGGLE_THEME,
  TOGGLE_SIDEBAR,
  SET_PAGE_TITLE,
  SET_ADD_PRODUCT_INITIAL_STATE,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppSettings = (state: RootState) => state["app-settings"];
