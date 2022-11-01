import React from "react";
import { NavLink } from "react-router-dom";

type SectionHeaderProps = {
  title: string;
  children?: React.ReactNode;
  to: string;
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
    <header className="flex sm:items-center items-start gap-3 sm:gap-0 justify-between flex-col sm:flex-row w-full my-3">
      <h3 className="text-base lg:text-2xl capitalize dark:text-gray-100">
        {title}
      </h3>
      <nav className="flex gap-3 h-8">
        {children}
        <NavLink
          className="flex items-center justify-center gap-3 font-medium capitalize text-sm bg-violet-500 hover:bg-violet-400 dark:hover:bg-violet-200 dark:bg-violet-300 dark:text-black text-white px-4 h-full rounded shadow"
          to={to}
          onClick={onClick}
        >
          <i className="fi fi-sr-plus leading-3 select-none pointer-events-none"></i>
          <p>{buttonTitle}</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default SectionHeader;
