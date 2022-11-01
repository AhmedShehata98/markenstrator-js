import React, { forwardRef, LegacyRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { LOGOUT_ACCOUNT } from "../Redux/Slice/UserSlice";
import { routesList } from "../Router/RoutesList";

const AccountMenu = forwardRef((props, ref: LegacyRef<HTMLUListElement>) => {
  const dispatch = useAppDispatch();

  return (
    <ul className="account-menu hide-menu" ref={ref}>
      <span className="flex flex-col h-6 mb-2 border-b w-full">
        <p className="font-bold text-xs text-gray-700 pb-2 dark:text-white">
          account menu
        </p>
      </span>
      <li className="account-menu-items ">
        <Link className="w-full flex gap-3" to={routesList?.settings || "#"}>
          <span className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full dark:bg-zinc-400 ">
            <i className="fi fi-rr-settings text-sm leading-3 dark:text-black"></i>
          </span>
          <p className="font-bold text-sm text-gray-600 text-center dark:text-white">
            settings
          </p>
        </Link>
      </li>
      <li
        className="account-menu-items "
        onClick={() => dispatch(LOGOUT_ACCOUNT())}
      >
        <span className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full dark:bg-zinc-400 select-none pointer-events-none">
          <i className="fi fi-rr-sign-out-alt text-sm text-rose-400 leading-3 dark:text-rose-700"></i>
        </span>
        <p className="font-bold text-sm text-rose-400 text-center dark:text-rose-400 select-none pointer-events-none">
          sign out
        </p>
      </li>
    </ul>
  );
});

export default AccountMenu;
