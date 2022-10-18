import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
const Root = () => {
  return (
    <>
      <SideMenu />
      <Outlet />
    </>
  );
};

export default Root;
