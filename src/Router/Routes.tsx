import { lazy, Suspense, useLayoutEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import {
  BrowserRouter as Router,
  Route,
  Routes as RoutesWrapper,
} from "react-router-dom";
import LoadingModule from "../components/LoadingModule";
import Navbar from "../components/Navbar";
import Root from "../Pages/Root";
import { useAppSelector } from "../Redux/ReduxHooks";
const AddProducts: React.LazyExoticComponent<
  React.MemoExoticComponent<() => JSX.Element>
> = lazy(() => import("../Pages/AddProducts"));
const Orders: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/Orders")
);
const AllProducts: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/AllProducts")
);
const Home: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/Home")
);
const Login: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/Login")
);
const Signup: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/Signup")
);
const Settings: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/Settings")
);
const Categories: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/Categories")
);
const NotFounded: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../Pages/NotFounded")
);

import { routesList } from "./RoutesList";

export default function Routes() {
  const {
    "app-settings": { currentTheme, isLoggedIn },
  } = useAppSelector((state) => state);
  const [queryClient] = useState(new QueryClient());
  useLayoutEffect(() => {
    window.document.documentElement.classList.add(currentTheme as string);
  }, [currentTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <RoutesWrapper>
        <Route
          path={routesList?.app}
          element={
            <Suspense fallback={<LoadingModule />}>
              {isLoggedIn ? (
                <>
                  <Navbar />
                  <Root />
                </>
              ) : (
                <Login />
              )}
            </Suspense>
          }
        >
          <Route
            index={true}
            element={
              <Suspense fallback={<LoadingModule />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={routesList?.allProducts}
            element={
              <Suspense fallback={<LoadingModule />}>
                <AllProducts />
              </Suspense>
            }
          />
          <Route
            path={routesList?.addProducts}
            element={
              <Suspense fallback={<LoadingModule />}>
                <AddProducts />
              </Suspense>
            }
          />
          <Route
            path={routesList?.category}
            element={
              <Suspense fallback={<LoadingModule />}>
                <Categories />
              </Suspense>
            }
          />
          <Route
            path={routesList?.orders}
            element={
              <Suspense fallback={<LoadingModule />}>
                <Orders />
              </Suspense>
            }
          />
          <Route
            path={routesList?.settings}
            element={
              <Suspense fallback={<LoadingModule />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path={"*"}
            element={
              <Suspense fallback={<LoadingModule />}>
                <NotFounded />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={routesList.signUp}
          element={
            <Suspense fallback={<LoadingModule />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path={routesList.login}
          element={
            <Suspense fallback={<LoadingModule />}>
              <Login />
            </Suspense>
          }
        />
      </RoutesWrapper>
    </QueryClientProvider>
  );
}
