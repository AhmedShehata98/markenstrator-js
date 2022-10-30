import React, { useLayoutEffect, useRef } from "react";
import UserPannelBtn from "./UserPannelBtn";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { TOGGLE_THEME } from "../Redux/Slice/AppSlice";
import SidebarNavLink from "./SidebarNavLink";
import CollapseMenu from "../components/CollapseMenu";
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
      window.document.body.classList.add("body-prevent-scroll-not_LG");
    } else {
      sidebarRef.current?.classList.remove("side-menu-show");
      sidebarRef.current?.classList.add("side-menu-hide");
      window.document.body.classList.remove("body-prevent-scroll-not_LG");
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
        <i className="fi fi-sr-search text-gray-600 px-3 leading-3 dark:text-zinc-100 "></i>
      </form>
      <div className="flex items-center justify-end w-full lg:hidden">
        <span className="flex items-center gap-3 mr-10">
          <UserPannelBtn
            className="navbar-link"
            icon={<i className="fi fi-sr-bell"></i>}
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
          icon={<i className="fi fi-sr-apps leading-3"></i>}
          title="overview"
          to={routesList?.app || "#"}
          end={true}
        />

        <CollapseMenu
          key={nanoid(3)}
          title="products"
          to={routesList?.allProducts || "#"}
          icon={<i className="fi fi-sr-boxes leading-3"></i>}
          dropdownChildrenData={[
            {
              id: nanoid(5),
              title: "all products",
              to: routesList.allProducts as string,
            },
            {
              id: nanoid(5),
              title: "category",
              to: routesList.category as string,
            },
          ]}
        />

        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-sr-list leading-3"></i>}
          title="Orders"
          to={routesList?.orders || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-sr-chart-pie leading-3"></i>}
          title="statistics"
          to={routesList?.statistics || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-sr-users leading-3"></i>}
          title="users"
          to={routesList?.users || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-sr-treatment leading-3"></i>}
          title="invoices"
          to={routesList?.invoices || "#"}
        />
        <SidebarNavLink
          key={nanoid(3)}
          icon={<i className="fi fi-sr-settings leading-3"></i>}
          title="settings"
          to={routesList?.settings || "#"}
        />
      </nav>
    </aside>
  );
};

export default SideMenu;
