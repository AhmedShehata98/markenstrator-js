import React from "react";

type Props = {
  actualOrdersLength: number | undefined;
  currentPage: string | undefined;
  length: number | undefined;
  limit: string | undefined;
  remainingPages: number | undefined;
  onClickToChangePage: React.MouseEventHandler;
  children: React.ReactNode | React.ReactNode[];
};
function PaginationWrapper({
  actualOrdersLength,
  children,
  currentPage,
  length,
  limit,
  remainingPages,
  onClickToChangePage,
}: Props) {
  const renderPaginationButtons = (buttonNumber: number) =>
    React.Children.map(children, (child) => {
      return React.cloneElement(child as any, {
        key: buttonNumber,
        pageNo: buttonNumber,
        currentPage: +currentPage!,
        onClickToChangePage,
        remainingPages,
      });
    });
  return (
    <div className="w-full max-w-full flex items-center justify-evenly gap-2 overflow-auto">
      <button
        className={`pagination-btn capitalize font-normal ${
          currentPage &&
          +currentPage <= 1 &&
          "opacity-50 cursor-no-drop pointer-events-none"
        }`}
      >
        prev
      </button>
      <ul className="w-max flex items-center justify-around gap-2">
        {limit &&
          Array.from({ length: +limit }, (_, k) => k + 1)?.map((pageNumber) =>
            renderPaginationButtons(+pageNumber)
          )}
      </ul>
      <button
        className={`pagination-btn capitalize font-normal
      ${
        remainingPages &&
        +remainingPages <= 1 &&
        "opacity-50 cursor-no-drop pointer-events-none"
      }
      `}
      >
        next
      </button>
    </div>
  );
}

export default PaginationWrapper;
