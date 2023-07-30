import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

type Props = {
  menuOptionsData?: OptionData[];
  children: React.ReactNode | React.ReactNode[] | undefined;
  mainHref?: string | undefined;
  buttonTitle: string;
  Icon: React.ReactNode;
};

export type OptionData = {
  title: string;
  onClic?: React.MouseEventHandler;
  navigateTo: string;
};
function AccordionMenuButton({
  mainHref,
  buttonTitle,
  Icon,
  menuOptionsData,
  children,
}: Props) {
  const [openOptionsList, setOpenOptionsList] = useState(false);
  const { pathname } = useLocation();
  const renderChildrens = (option: OptionData) => {
    return React.Children.map(
      children as any,
      (child: React.DetailedReactHTMLElement<any, HTMLElement>) =>
        React.cloneElement(child, { option })
    );
  };

  const handleShowOptionsList = (ev: React.MouseEvent<HTMLButtonElement>) => {
    (ev.target as HTMLButtonElement).classList.toggle("rotate-180");
    setOpenOptionsList((prev) => !prev);
  };
  console.log(pathname.endsWith(`/${mainHref}`));
  console.log(pathname);
  console.log(`/${mainHref}`!);
  return (
    <div className="w-full flex flex-col items-center justify-between ">
      <div
        className={`w-full flex items-center justify-start rounded-md overflow-hidden hover:!text-violet-700 hover:bg-violet-200 ${
          pathname.endsWith(mainHref!) && "text-violet-700 bg-violet-200"
        }`}
      >
        <Link
          to={mainHref ?? "#"}
          type="button"
          className="w-3/4 flex items-center justify-start gap-3 px-3 py-2"
        >
          <span className="text-xl pointer-events-none">{Icon}</span>
          <p className="text-gray-700 text-sm font-semibold uppercase hover:text-violet-900">
            {buttonTitle}
          </p>
        </Link>
        {Array.isArray(menuOptionsData) && (
          <button
            onClick={(ev) => handleShowOptionsList(ev)}
            type="button"
            className="h-full w-16 flex items-center justify-center text-3xl hover:bg-violet-400 hover:text-white"
          >
            <RiArrowDropDownLine className="pointer-events-none" />
          </button>
        )}
      </div>
      {menuOptionsData && Array.isArray(menuOptionsData) && openOptionsList && (
        <ul
          className={`w-full ps-7 pe-1 my-2 transition-all hidden ${
            openOptionsList && "!grid"
          }`}
        >
          {menuOptionsData.map((option) => renderChildrens(option))}
        </ul>
      )}
    </div>
  );
}

export default AccordionMenuButton;
