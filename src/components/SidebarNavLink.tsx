import React from "react";
import { NavLink } from "react-router-dom";

type SidebarNavLinkPropsType = {
  title: string;
  icon: JSX.Element;
  to: string;
};
const SidebarNavLink = ({ icon, title, to }: SidebarNavLinkPropsType) => {
  return (
    <NavLink
      className={({ isActive }) =>
        Boolean(isActive)
          ? "sidebar-items sidebar-items-active"
          : "sidebar-items"
      }
      to={to || "#"}
    >
      <span className="sidebar-icon ">{icon}</span>
      <p className="sidebar-paragraph">{title}</p>
    </NavLink>
  );
};

export default SidebarNavLink;
