import React from "react";

type Props = {
  pageNo?: number;
  currentPage?: number;
  onClickToChangePage?: React.MouseEventHandler;
  remainingPages?: number;
};
export default function PaginationBtn({
  pageNo,
  currentPage,
  onClickToChangePage,
  remainingPages,
}: Props) {
  if (remainingPages && remainingPages <= 0) {
    return (
      <p className="text-gray-600 capitalize text-sm">
        no longer order here to show .
      </p>
    );
  } else {
    return (
      <button
        className="flex items-center justify-center rounded shadow-md px-5 py-3 bg-zinc-300 text-neutral-900 font-bold hover:bg-zinc-200 disabled:bg-violet-700 disabled:text-gray-100"
        disabled={pageNo === currentPage}
        onClick={onClickToChangePage}
        data-pageNo={pageNo}
      >
        {pageNo}
      </button>
    );
  }
}
