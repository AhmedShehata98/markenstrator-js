import React, { useLayoutEffect, useRef } from "react";
import UserPannelBtn from "./UserPannelBtn";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { TOGGLE_THEME } from "../Redux/Slice/AppSlice";
import SidebarNavLink from "./SidebarNavLink";
import CollapseMenu from "../components/CollapseMenu";
import { nanoid } from "@reduxjs/toolkit";
import { routesList } from "../Router/RoutesList";
import AccordionMenuButton from "./AccordionMenuButton/AccordionMenuButton";
import AccourdionMenuOption from "./AccordionMenuButton/AccourdionMenuOption";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";

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
        <AccordionMenuButton
          buttonTitle="overview"
          mainHref={routesList?.app}
          key={nanoid(3)}
          Icon={<i className="fi fi-sr-apps text-inherit leading-3"></i>}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton>
        <AccordionMenuButton
          buttonTitle="orders"
          mainHref={routesList?.orders}
          key={nanoid(3)}
          Icon={<i className="fi fi-sr-list text-inherit leading-3"></i>}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton>
        <AccordionMenuButton
          buttonTitle="products"
          Icon={<BsFillBoxSeamFill />}
          menuOptionsData={[
            {
              title: "products list",
              navigateTo: routesList.allProducts,
            },
            {
              title: "add prodcts",
              navigateTo: `${routesList.allProducts}/${routesList.addProducts}`,
            },
          ]}
          mainHref={routesList.allProducts}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton>
        <AccordionMenuButton
          buttonTitle="categories"
          Icon={<MdCategory />}
          menuOptionsData={[
            {
              title: "categories list",
              navigateTo: routesList.category,
            },
            {
              title: "add category",
              navigateTo: `${routesList.category}/${routesList.addCategory}`,
            },
          ]}
          mainHref={routesList.category}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton>
        {/* <AccordionMenuButton
          buttonTitle="users"
          Icon={<i className="fi fi-sr-users text-inherit leading-3"></i>}
          mainHref={routesList?.users}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton>
        <AccordionMenuButton
          buttonTitle="invoices"
          Icon={<i className="fi fi-sr-treatment text-inherit leading-3"></i>}
          mainHref={routesList?.invoices}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton> */}
        <AccordionMenuButton
          buttonTitle="settings"
          Icon={<i className="fi fi-sr-settings text-inherit leading-3"></i>}
          mainHref={routesList?.settings}
        >
          <AccourdionMenuOption />
        </AccordionMenuButton>
      </nav>
    </aside>
  );
};

export default SideMenu;
