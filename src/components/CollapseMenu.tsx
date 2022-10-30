import React, { useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

type CollapseMenuProps = {
  title: string;
  to: string;
  end?: boolean;
  icon: JSX.Element;
  dropdownChildrenData: Partial<ICollapseMenuData>[];
};
interface ICollapseMenuData {
  title: string;
  to: string;
  end: boolean;
  id: string;
}
const CollapseMenu = ({
  dropdownChildrenData,
  to,
  end,
  icon,
  title,
}: CollapseMenuProps) => {
  const dropMenuChildListRef = useRef<HTMLUListElement | null>(null);

  window.addEventListener("click", (ev: MouseEvent) => {
    const element = ev.target as HTMLElement;
    if (
      !element.classList.contains("dropdown-menu-link") &&
      !element.classList.contains("dropdown-children-link")
    ) {
      dropMenuChildListRef.current?.classList.add("dropdown-closed");
    }
  });

  const handleCloseDropMenu = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLElement;
    const highLevelParent = element.closest("ul");
    const childDropMenu = highLevelParent?.lastElementChild as HTMLUListElement;
    childDropMenu.classList.toggle("dropdown-closed");
    console.log(childDropMenu);
  };
  return (
    <ul className="drop-menu-parent">
      <li className="dropdown-item">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "dropdown-menu-link dropdown-active"
              : "dropdown-menu-link"
          }
          to={to || "#"}
          end={end}
          onClick={(ev: React.MouseEvent) => handleCloseDropMenu(ev)}
        >
          <span className="flex items-center justify-center w-1/5 aspect-square p-2 rounded-lg bg-gray-100 dark:bg-zinc-500 shadow-inner select-none pointer-events-none">
            {icon}
          </span>
          <p className="w-3/4 select-none pointer-events-none">{title}</p>
          <span className="flex items-center justify-end w-2/12">
            <i className="fi fi-sr-caret-down leading-3 inline-block select-none pointer-events-none"></i>
          </span>
        </NavLink>
      </li>
      <ul
        ref={dropMenuChildListRef}
        className="flex flex-col items-center justify-start gap-1 my-2 min-w-full transition-all dropdown-closed"
      >
        {dropdownChildrenData.map((child) => {
          return (
            <li key={nanoid(4)} className="dropdown-children-item ">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "dropdown-children-link bg-violet-400 dark:bg-violet-300 dark:text-black"
                    : "dropdown-children-link"
                }
                to={child.to!}
                key={child.id}
              >
                {child.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </ul>
  );
};

export default CollapseMenu;
