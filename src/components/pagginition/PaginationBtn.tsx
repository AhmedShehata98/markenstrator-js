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
        className="pagination-btn"
        disabled={pageNo === currentPage}
        onClick={onClickToChangePage}
        data-pageNo={pageNo}
      >
        {pageNo}
      </button>
    );
  }
}
