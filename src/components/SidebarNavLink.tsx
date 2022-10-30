import React from "react";
import { NavLink } from "react-router-dom";

type SidebarNavLinkPropsType = {
  title: string;
  icon: JSX.Element;
  collapse?: boolean;
  to: string;
  end?: boolean;
  children?: React.ReactNode;
};

const SidebarNavLink = ({
  collapse,
  icon,
  title,
  to,
  end,
}: SidebarNavLinkPropsType) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "sidebar-items sidebar-items-active" : "sidebar-items"
      }
      to={to || "#"}
      end={end}
    >
      <button className={`${"sidebar-btn"}`}>
        <span className="sidebar-icon w-1/5 pointer-events-none select-none">
          {icon}
        </span>
        <p className="w-3/5 text-start px-3 pointer-events-none select-none ">
          {title}
        </p>
      </button>
    </NavLink>
  );
};

export default SidebarNavLink;
