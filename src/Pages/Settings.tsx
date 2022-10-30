import React from "react";
import useDocumentWidth from "../Hooks/useDocumentWidth";
import ChangePassword from "../components/ChangePassword";
import Notifications from "../components/Notifications";
import EditProfile from "../components/EditProfile";

const Settings = () => {
  const { documentWidth } = useDocumentWidth();
  // const {} = useForm<>()
  return (
    <main className="bg-zinc-100 dark:bg-zinc-700">
      <section
        className="min-h-screen w-full lg:ml-auto mt-14 p-3"
        style={
          documentWidth >= 1024
            ? { width: "calc(100% - 12rem)" }
            : { width: "100%" }
        }
      >
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
