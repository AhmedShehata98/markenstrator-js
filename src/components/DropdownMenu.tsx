import React, { useEffect, useRef } from "react";

type Props = {
  optionsListData: {
    title: string;
    icon: React.ReactNode;
    onClick: React.MouseEventHandler;
  }[];
};
function DropdownMenu({ optionsListData }: Props) {
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEvent = (ev: MouseEvent) => {
    if (
      (ev.target as HTMLElement).id !== "dropmenu-option"
      //   (ev.target as HTMLElement).id !== "dropmenu-toggler"
    ) {
      dropdownMenuRef.current?.classList.remove(
        "translate-y-4",
        "scale-95",
        "opacity-0"
      );
    }
  };
  useEffect(() => {
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
      className="dropdown-menu translate-y-4 scale-95 opacity-0"
    >
      <ul className="w-full flex flex-col items-start justify-center gap-1 p-1 divide-y-2">
        {optionsListData.map((li) => (
          <li
            id="dropmenu-option"
            className="w-full flex gap-3 items-center justify-start p-2 hover:bg-gray-300"
            onClick={li.onClick}
          >
            <span className="w-7 h-7 flex items-center justify-center bg-violet-300 rounded-full pointer-events-none">
              {li.icon}
            </span>
            <p className="text-gray-700 font-medium text-sm capitalize">
              {li.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
