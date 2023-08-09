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
    <div>
      <ul className="w-full flex items-center justify-around gap-2">
        {limit &&
          Array.from({ length: +limit }, (_, k) => k + 1)?.map((pageNumber) =>
            renderPaginationButtons(+pageNumber)
          )}
      </ul>
    </div>
  );
}

export default PaginationWrapper;
