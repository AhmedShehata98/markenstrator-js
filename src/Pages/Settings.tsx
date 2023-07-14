import React, { useEffect, useRef } from "react";
import ChangePassword from "../components/ChangePassword";
import Notifications from "../components/Notifications";
import EditProfile from "../components/EditProfile";

const Settings = () => {
  const settingsRef = useRef<HTMLElement | null>(null);
  let timeout: ReturnType<typeof setTimeout>;

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
    <main
      ref={settingsRef}
      className="main-wrapper section-fade-closed dark:bg-zinc-800"
    >
      <span className="sidebar-space"></span>
      <section className="content-container p-0">
        <article className="w-full bg-white dark:bg-zinc-800 rounded p-2">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <li className="flex flex-col mb-3">
              <ChangePassword />
              <Notifications />
            </li>
            <li className="mb-3 h-fit">
              <EditProfile />
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default Settings;
