import React from "react";
import { NavLink } from "react-router-dom";

type SectionHeaderProps = {
  title: string;
  children?: React.ReactNode;
  to: string;
  buttonTitle: string;
};
const SectionHeader = ({
  buttonTitle,
  children,
  title,
  to,
}: SectionHeaderProps) => {
  return (
    <header className="flex sm:items-center items-start gap-3 sm:gap-0 justify-between flex-col sm:flex-row w-full my-3">
      <h3 className="text-base lg:text-2xl capitalize dark:text-gray-100">
        {title}
      </h3>
      <nav className="flex gap-3">
        <form className="flex items-center justify-center min-w-fit rounded border dark:border-slate-600 bg-gray-100 dark:bg-zinc-700 dark:text-white py-1 px-3">
          {children}
        </form>
        <NavLink
          className="flex items-center gap-1 bg-violet-500 dark:bg-sky-400 dark:text-black text-white px-3 py-1 rounded shadow"
          to={to}
        >
          <i className="fi fi-sr-plus-small leading-3 select-none pointer-events-none"></i>
          <p>{buttonTitle}</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default SectionHeader;
