import { lazy, Suspense } from "react";
import { createBrowserRouter, Route, RouteObject } from "react-router-dom";
import LoadingModule from "../components/LoadingModule";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import AddProducts from "../Pages/AddProducts";
import Root from "../Pages/Root";
const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));

import { routesList } from "./RoutesList";

export const routes: RouteObject[] = [
  {
    path: routesList.app,
    element: (
      <Suspense fallback={<LoadingModule />}>
        <Navbar />
        <Root />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routesList.addProducts,
        element: <AddProducts />,
      },
    ],
  },
  {
    path: routesList.login,
    element: <Login />,
  },
];
