import React, { useLayoutEffect } from "react";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";

const LoadingModule = () => {
  useLayoutEffect(() => {
    document.body.classList.add(...["fixed", "w-full", "max-h-screen"]);

    return () => {
      document.body.classList.remove(...["fixed", "w-full", "max-h-screen"]);
    };
  }, []);
  return (
    <main className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center flex-col dark:bg-zinc-700 text-white">
      <div className="w-full h-1/3 flex justify-center items-center">
        <span className="w-32 flex justify-center items-center mt-24">
          {Boolean(localStorage.themeMode) &&
          localStorage.themeMode === "dark" ? (
            <img
              src={logoDark}
              alt="logo"
              className="max-w-md object-cover object-center"
            />
          ) : (
            <img
              src={logo}
              alt="logo"
              className="max-w-full object-cover object-center"
            />
          )}
        </span>
      </div>
      <div className="w-full h-2/3 flex flex-col justify-start items-center">
        <span className="w-9 h-9 border-4 border-l-indigo-700 border-t-gray-200 border-r-gray-200 border-b-gray-200 dark:border-l-indigo-500 dark:border-t-slate-600 dark:border-r-slate-600 dark:border-b-slate-600 rounded-full animate-spin-fast mt-28"></span>
        <p className="my-4 capitalize font-sans font-semibold text-gray-800 dark:text-white">
          just a moment ..
        </p>
      </div>
    </main>
  );
};

export default LoadingModule;
