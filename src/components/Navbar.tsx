import React, { useLayoutEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import UserPannelBtn from "./UserPannelBtn";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { TOGGLE_THEME, TOGGLE_SIDEBAR } from "../Redux/Slice/AppSlice";
import { LOGOUT_ACCOUNT } from "../Redux/Slice/UserSlice";
import { Link } from "react-router-dom";
import { routesList } from "../Router/RoutesList";
import AccountMenu from "./AccountMenu";
import NotificationsMenu from "./NotificationsMenu";
import { notificationMenuData } from "../Utilities/dummyData";

const Navbar = () => {
  const {
    "app-settings": { currentTheme, showSidebar },
    user: { pending, isLoggedIn, userData },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const accountMenuRef = useRef<HTMLUListElement>(null);
  const notificationsMenu = useRef<HTMLDivElement>(null);
  const handleAccountMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    accountMenuRef.current?.classList.toggle("hide-menu");
  };
  const handleShowNotificationsMenu = () => {
    notificationsMenu.current?.classList.toggle("hide-menu");
  };

  return (
    <header className="header">
      <section className="navbar-container">
        {currentTheme === "dark" ? (
          <img src={logoDark} alt="logo" className="h-52 object-cover" />
        ) : (
          <img src={logo} alt="logo" className="w-20 " />
        )}
        <span className="hidden lg:flex lg:flex-col ">
          {pending && Object.entries(userData!)?.length === 0 && (
            <span className="flex flex-wrap flex-col items-start justify-center w-36 animate-pulse">
              <span className="h-4">
                <small className="inline-block w-10 h-4  rounded-xl mr-2 bg-zinc-300 dark:bg-zinc-500"></small>
                <small className="inline-block w-24 h-4 rounded-xl  bg-zinc-300 dark:bg-zinc-500"></small>
              </span>
              <span className="h-3">
                <small className="inline-block w-20 h-3 rounded-xl mr-2  bg-zinc-300 dark:bg-zinc-500"></small>
                <small className="inline-block w-7 h-3 rounded-xl  bg-zinc-300 dark:bg-zinc-500"></small>
              </span>
            </span>
          )}
          {!pending && Object.entries(userData!)?.length >= 1 && (
            <>
              <h4 className="font-semibold text-gray-600 capitalize dark:text-zinc-100">
                {`good morning , ${userData?.username}`}
              </h4>
              <p className="text-xs text-gray-400 capitalize">
                welcome to marketify app dashboard
              </p>
            </>
          )}
        </span>
        <form className="navbar-search hidden lg:flex">
          <input
            className="rounded-full h-8 focus:outline-none placeholder:capitalize placeholder:text-sm bg-inherit border-0 dark:placeholder:text-zinc-300 dark:bg-zinc-600"
            type="search"
            placeholder="search on something"
          />
          <i className="fi fi-rr-search text-gray-600 px-3 leading-3 dark:text-zinc-100 "></i>
        </form>
        <nav className="navbar flex-row-reverse lg:flex-row">
          <div className="flex items-center gap-3 lg:mr-4 ">
            <UserPannelBtn
              className="menu-btn"
              icon={
                showSidebar ? (
                  <i className="fi fi-br-cross leading-3 pointer-events-none select-none"></i>
                ) : (
                  <i className="fi fi-br-menu-burger leading-3 pointer-events-none select-none"></i>
                )
              }
              clickHandler={(ev) => dispatch(TOGGLE_SIDEBAR())}
            />
            <UserPannelBtn
              className="navbar-link hidden lg:flex"
              icon={<i className="fi fi-rr-bell leading-3"></i>}
              clickHandler={() => handleShowNotificationsMenu()}
            />
            <UserPannelBtn
              className="navbar-link hidden lg:flex"
              icon={
                currentTheme === "light" ? (
                  <i className="fi fi-sr-sun leading-3 pointer-events-none select-none"></i>
                ) : (
                  <i className="fi fi-sr-moon leading-3 pointer-events-none select-none"></i>
                )
              }
              clickHandler={(ev) => dispatch(TOGGLE_THEME())}
            />
          </div>
          <figure className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full hidden lg:inline-block"
              src="https://picsum.photos/200"
              alt="user-image"
            />
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleAccountMenu(e)
              }
            >
              <p className=" capitalize text-sm font-bold text-gray-700 dark:text-zinc-100">
                {`${userData?.firstname} ${userData?.lastname}`}
              </p>
              <i className="fi fi-br-angle-down leading-[0.5rem] text-xs dark:text-zinc-100"></i>
            </button>
          </figure>
          <AccountMenu ref={accountMenuRef} />
          <NotificationsMenu
            ref={notificationsMenu}
            notificationMenuData={notificationMenuData}
          />
        </nav>
      </section>
    </header>
  );
};

export default Navbar;
