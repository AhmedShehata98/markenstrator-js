import React from "react";
import { OptionData } from "./AccordionMenuButton";
import { Link, useLocation } from "react-router-dom";

type Props = {
  option?: OptionData;
};
function AccourdionMenuOption({ option }: Props) {
  const { pathname } = useLocation();

  return (
    <Link
      to={option?.navigateTo!}
      className={`w-full py-1.5 px-3 hover:bg-gray-200 rounded-md cursor-pointer`}
    >
      <p
        className={`max-w-full overflow-hidden truncate text-sm capitalize ${
          pathname.endsWith(`${option?.navigateTo}`)
            ? "text-violet-700 font-medium"
            : "text-gray-700"
        }`}
      >
        {option?.title}
      </p>
    </Link>
  );
}

export default AccourdionMenuOption;
