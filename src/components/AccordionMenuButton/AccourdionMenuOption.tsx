import React from "react";
import { OptionData } from "./AccordionMenuButton";
import { Link } from "react-router-dom";

type Props = {
  option?: OptionData;
};
function AccourdionMenuOption({ option }: Props) {
  return (
    <Link
      to={option?.navigateTo!}
      className="w-full py-1.5 px-3 hover:bg-gray-200 rounded-md cursor-pointer"
    >
      <p className="max-w-full overflow-hidden truncate text-gray-700 text-sm capitalize">
        {option?.title}
      </p>
    </Link>
  );
}

export default AccourdionMenuOption;
