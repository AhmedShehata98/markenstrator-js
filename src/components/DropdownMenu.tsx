import React, { useEffect, useRef } from "react";

type Props = {
  optionsListData: {
    title: string;
    icon: React.ReactNode;
    onClick: React.MouseEventHandler;
  }[];
  isToggled: boolean;
  togglerFn: (open: boolean) => void;
};
function DropdownMenu({ optionsListData, isToggled, togglerFn }: Props) {
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseEvent = (ev: MouseEvent) => {
      if ((ev.target as HTMLElement).id !== "dropmenu-toggler") {
        togglerFn(false);
      }
    };
    window.document.addEventListener("click", handleMouseEvent);
    return () => {
      window.document.removeEventListener("click", handleMouseEvent);
    };
  }, []);

  const handleShowDropdownMenu = () => {
    dropdownMenuRef.current?.classList.toggle("dropdown-menu-show");
  };

  return (
    <div
      ref={dropdownMenuRef}
      className={`dropdown-menu ${isToggled ? "dropdown-menu-show" : null}`}
    >
      <ul className="dropdown-list-options">
        {optionsListData.map((li) => (
          <li
            key={li.title}
            id="dropmenu-option"
            className="dropdown-option"
            onClick={li.onClick}
          >
            <span className="dropdown-icon">{li.icon}</span>
            <p className="dropdown-title">{li.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
