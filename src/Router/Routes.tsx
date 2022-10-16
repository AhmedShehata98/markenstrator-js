import { lazy, Suspense } from "react";
import { createBrowserRouter, Route, RouteObject } from "react-router-dom";
import Navbar from "../components/Navbar";
// const Home = lazy(() => import("../Pages/Home"));
// const Login = lazy(() => import("../Pages/Login"));
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { routesList } from "./RoutesList";

export const routes: RouteObject[] = [
  {
    path: routesList.app,
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: routesList.login,
    element: <Login />,
  },
];
