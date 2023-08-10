import React from "react";
import { NavLink } from "react-router-dom";

type SectionHeaderProps = {
  title: string;
  children?: React.ReactNode;
  to?: string;
  buttonTitle: string;
  onClick?: React.MouseEventHandler;
};
const SectionHeader = ({
  buttonTitle,
  children,
  title,
  to,
  onClick,
}: SectionHeaderProps) => {
  return (
    <header className="flex sm:items-center items-end gap-3 sm:gap-0 justify-between flex-col sm:flex-row w-full my-3">
      <h3 className="w-max text-base lg:text-2xl capitalize dark:text-gray-100">
        {title}
      </h3>
      <nav className="max-lg:w-full w-max flex items-center justify-end gap-3">
        {children}
        <button
          className="flex items-center justify-center gap-3 font-medium capitalize text-sm bg-violet-500 hover:bg-violet-400 dark:hover:bg-violet-200 dark:bg-violet-300 dark:text-black text-white px-3 py-2 h-full rounded shadow"
          onClick={onClick}
        >
          <i className="fi fi-sr-plus leading-3 select-none pointer-events-none"></i>
          <p className="max-md:hidden w-max">{buttonTitle}</p>
        </button>
      </nav>
    </header>
  );
};

export default SectionHeader;
