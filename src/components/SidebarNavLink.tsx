import React from "react";
import { NavLink } from "react-router-dom";

type SidebarNavLinkPropsType = {
  title: string;
  icon: JSX.Element;
  to: string;
  end?: boolean;
};
const SidebarNavLink = ({ icon, title, to, end }: SidebarNavLinkPropsType) => {
  return (
    <NavLink
      className={({ isActive }) =>
        Boolean(isActive)
          ? "sidebar-items sidebar-items-active"
          : "sidebar-items"
      }
      to={to || "#"}
      end={end}
    >
      <span className="sidebar-icon ">{icon}</span>
      <p className="sidebar-paragraph">{title}</p>
    </NavLink>
  );
};

export default SidebarNavLink;
