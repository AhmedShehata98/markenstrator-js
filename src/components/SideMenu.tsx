import React, { forwardRef } from "react";
import UserPannelBtn from "./UserPannelBtn";

const SideMenu = forwardRef((props, ref: React.LegacyRef<HTMLElement>) => {
  function StoreThemeClass(className: string): void {
    window.localStorage.setItem("themeMode", className);
  }
  function getThemeClass(localStoreageThemeKey: string): string | null {
    return window.localStorage.getItem(localStoreageThemeKey);
  }
  const toggleThemeMode: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ): void => {
    const htmlElement = window.document.documentElement as HTMLHtmlElement;
    const button = event.target as HTMLElement;
    const icon = button.firstChild as HTMLElement;
    //
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
    } else {
      htmlElement.classList.remove("light");
      htmlElement.classList.add("dark");
    }
    StoreThemeClass(htmlElement.className);
    if (icon.classList.contains("fi-sr-moon")) {
      icon.classList.remove("fi-sr-moon");
      icon.classList.add("fi-sr-sun");
    } else {
      icon.classList.remove("fi-sr-sun");
      icon.classList.add("fi-sr-moon");
    }
  };
  return (
    <aside ref={ref} className="sidebar-menu">
      <form className="flex items-center justify-between border-2 border-gray-400 w-10/12 mb-3 mx-auto px-2 lg:hidden">
        <input
          className="rounded-full h-8 focus:outline-none placeholder:capitalize placeholder:text-sm dark:bg-zinc-600"
          type="search"
          placeholder="search on something .."
        />
        <i className="fi fi-rr-search text-gray-600 px-3 leading-3 dark:text-zinc-100 "></i>
      </form>
      <div className="flex items-center justify-end w-full lg:hidden">
        <span className="flex items-center gap-3 mr-10">
          <UserPannelBtn
            className="navbar-link"
            icon={<i className="fi fi-rr-bell"></i>}
            clickHandler={() => console.log("notification btn")}
          />
          <UserPannelBtn
            className="navbar-link"
            icon={
              <i className="fi fi-sr-moon pointer-events-none select-none"></i>
            }
            clickHandler={toggleThemeMode}
          />
        </span>
      </div>
      <nav className="sidebar-navigation">
        <a href="#" className="sidebar-items sidebar-items-active">
          <i className="fi fi-rr-apps leading-3"></i>
        </a>
        <a href="#" className="sidebar-items">
          <i className="fi fi-rr-box leading-3"></i>
        </a>
        <a href="#" className="sidebar-items">
          <i className="fi fi-br-shopping-cart-add leading-3"></i>
        </a>
        <a href="#" className="sidebar-items">
          <i className="fi fi-rs-chart-pie leading-3"></i>
        </a>
        <a href="#" className="sidebar-items">
          <i className="fi fi-rs-users leading-3"></i>
        </a>
        <a href="#" className="sidebar-items">
          <i className="fi fi-rs-treatment leading-3"></i>
        </a>
      </nav>
    </aside>
  );
});

export default SideMenu;
