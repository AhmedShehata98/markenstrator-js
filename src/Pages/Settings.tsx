import React, { useEffect, useRef } from "react";
import ChangePassword from "../components/ChangePassword";
import Notifications from "../components/Notifications";
import EditProfile from "../components/EditProfile";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const settingsRef = useRef<HTMLElement | null>(null);
  let timeout: ReturnType<typeof setTimeout>;
  const { pathname } = useLocation();

  useEffect(() => {
    window.document.title = pathname
      .split("/")
      [pathname.split("/").length - 1].split("-")
      .join(" ")
      .toLocaleUpperCase();
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      settingsRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    }, 5);
    return () => {
      clearTimeout(timeout);
      settingsRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    };
  }, []);
  return (
    <section
      ref={settingsRef}
      className="content-container section-fade-closed"
    >
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <li className="flex flex-col mb-3">
          <ChangePassword />
          <Notifications />
        </li>
        <li className="mb-3 h-fit">
          <EditProfile />
        </li>
      </ul>
    </section>
  );
};

export default Settings;
