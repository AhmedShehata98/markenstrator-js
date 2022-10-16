import React, { useLayoutEffect, useRef } from "react";
import UserPannelBtn from "./UserPannelBtn";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { TOGGLE_THEME } from "../Redux/Slice/AppSlice";
import SidebarNavLink from "./SidebarNavLink";
import { nanoid } from "@reduxjs/toolkit";
import { routesList } from "../Router/RoutesList";

const SideMenu = () => {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state["app-settings"]);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (showSidebar) {
      sidebarRef.current?.classList.remove("side-menu-hide");
      sidebarRef.current?.classList.add("side-menu-show");
    } else {
      sidebarRef.current?.classList.remove("side-menu-show");
      sidebarRef.current?.classList.add("side-menu-hide");
    }
  }, [showSidebar]);

  return (
    <aside ref={sidebarRef} className="sidebar-menu">
      <form className="side-menu-search">
        <input
          className="side-menu-input"
          type="search"
          placeholder="search on something .."
        />
        <i className="fi fi-rr-search text-gray-600 px-3 leading-3 dark:text-zinc-100 "></i>
      </form>
      <div className="flex items-center justify-end w-full lg:hidden">
        <span className="flex items-center gap-3 mr-10">
          <UserPannelBtn
            className="navbar-link"
            icon={<i className="fi fi-rr-bell"></i>}
            clickHandler={() => console.log("notification btn")}
          />
          <UserPannelBtn
            className="navbar-link"
            icon={
              <i className="fi fi-sr-moon pointer-events-none select-none"></i>
            }
            clickHandler={(ev) => dispatch(TOGGLE_THEME())}
          />
        </span>
      </div>
      <nav className="sidebar-navigation">
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-rr-apps leading-3"></i>}
          title="dashboard"
          to={routesList.app || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-br-shopping-cart-add leading-3"></i>}
          title="add products"
          to={routesList.addProducts || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-rs-chart-pie leading-3"></i>}
          title="statistics"
          to={routesList.statistics || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-rs-users leading-3"></i>}
          title="users"
          to={routesList.users || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-rs-treatment leading-3"></i>}
          title="invoices"
          to={routesList.invoices || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-rr-settings leading-3"></i>}
          title="settings"
          to={routesList.settings || "#"}
        />
      </nav>
    </aside>
  );
};

export default SideMenu;
