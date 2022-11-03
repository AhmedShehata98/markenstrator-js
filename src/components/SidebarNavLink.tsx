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
        isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
      }
      to={to || "#"}
      end={end}
    >
      <span className="sidebar-icon pointer-events-none select-none">
        {icon}
      </span>
      <p className="uppercase text-sm md:text-base font-semibold pointer-events-none select-none">
        {title}
      </p>
    </NavLink>
  );
};

export default SidebarNavLink;
