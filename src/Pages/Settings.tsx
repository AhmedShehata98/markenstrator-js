import React from "react";
import useDocumentWidth from "../Hooks/useDocumentWidth";
import ChangePassword from "../components/ChangePassword";
import Notifications from "../components/Notifications";
import EditProfile from "../components/EditProfile";

const Settings = () => {
  const { documentWidth } = useDocumentWidth();
  // const {} = useForm<>()
  return (
    <main className="main-wrapper">
      <span className="sidebar-space"></span>
      <section className="content-container">
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
