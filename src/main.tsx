import React from "react";
import ReactDOM from "react-dom/client";

// 3rd party libraries
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Provider } from "react-redux";

// helpers
import { routes } from "./Router/Routes";
import store from "./Redux/Store";

// components
import LoadingModule from "./components/LoadingModule";

// themes
import "./index.css";

const Router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={Router} fallbackElement={<LoadingModule />} />
  </Provider>
);
