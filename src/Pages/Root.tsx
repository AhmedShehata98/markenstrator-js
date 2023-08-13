import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
const Root = () => {
  return (
    <>
      <Navbar />
      <main className="w-full !h-[90vh] flex items-start justify-between overflow-hidden">
        <SideMenu />
        <Outlet />
      </main>
    </>
  );
};

export default Root;
