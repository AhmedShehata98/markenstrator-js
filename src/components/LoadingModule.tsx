import React from "react";
import logo from "../assets/images/logo.png";

const LoadingModule = () => {
  return (
    <main className="w-full flex justify-center items-center flex-col">
      <div className="w-full h-1/3 flex justify-center items-center">
        <span className="w-32 flex justify-center items-center mt-24">
          <img
            src={logo}
            alt="logo"
            className="max-w-full object-cover object-center"
          />
        </span>
      </div>
      <div className="w-full h-2/3 flex flex-col justify-start items-center">
        <span className="w-9 h-9 border-4 border-l-slate-800 border-t-slate-800 rounded-full mt-28 animate-spin-fast"></span>
        <p className="my-4 capitalize font-sans font-semibold text-gray-800">
          just a moment ..
        </p>
      </div>
    </main>
  );
};

export default LoadingModule;
