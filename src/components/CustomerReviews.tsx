import React from "react";

const CustomerReviews = () => {
  return (
    <div className="w-full h-full bg-white p-3 rounded-md shadow dark:bg-zinc-800 dark:text-zinc-100">
      <span className="card-headding flex justify-between items-center">
        <p className="text-sm font-semibold capitalize">customer reviews</p>
        <i className="fi fi-sr-refresh text-sky-500 text-xl"></i>
      </span>
      <div className="rate-in-starts flex gap-6 items-center justify-start mt-4 ">
        <span className="flex gap-1">
          <i className="fi fi-sr-star text-amber-400 text-lg"></i>
          <i className="fi fi-sr-star text-amber-400 text-lg"></i>
          <i className="fi fi-sr-star text-amber-400 text-lg"></i>
          <i className="fi fi-sr-star text-amber-400 text-lg"></i>
          <i className="fi fi-rr-star text-amber-400 text-lg"></i>
        </span>
        <span className="flex items-center justify-center gap-2 capitalize">
          <b>5.0</b>
          <small className="text-gray-500 text-xs font-bold dark:text-zinc-300">
            out of 4 starts
          </small>
        </span>
      </div>
      <small className="text-gray-500 capitalize text-xs font-bold dark:text-zinc-300">
        overall rating of 100 customer reviews
      </small>
      <div className="Progressbar">
        <div className="Progressbar-item-container">
          <small className="w-[6rem]">excellent</small>
          <span className="w-full flex items-center justify-between gap-2">
            <span className="progress-status bg-emerald-100 before:bg-emerald-500 before:w-9/12  "></span>
            <small>35</small>
          </span>
        </div>
        <div className="Progressbar-item-container">
          <small className="w-[6rem]">good</small>
          <span className="w-full flex items-center justify-between gap-2">
            <span className="progress-status bg-green-100 before:bg-green-500 before:w-9/12  "></span>
            <small>35</small>
          </span>
        </div>
        <div className="Progressbar-item-container">
          <small className="w-[6rem]">average</small>
          <span className="w-full flex items-center justify-between gap-2">
            <span className="progress-status bg-orange-100  before:bg-orange-400 before:w-9/12  "></span>
            <small>20</small>
          </span>
        </div>
        <div className="Progressbar-item-container">
          <small className="w-[6rem] text-xs">avg below</small>
          <span className="w-full flex items-center justify-between gap-2">
            <span className="progress-status bg-amber-100 before:bg-amber-500 before:w-9/12  "></span>
            <small>15</small>
          </span>
        </div>
        <div className="Progressbar-item-container">
          <small className="w-[6rem]">poor</small>
          <span className="w-full flex items-center justify-between gap-2">
            <span className=" progress-status bg-red-100 before:bg-red-500 before:w-9/12"></span>
            <small>05</small>
          </span>
        </div>
      </div>
      <button
        className="px-4 py-2 flex items-center justify-center  rounded-full font-semibold capitalize mt-10 mx-auto hover:underline underline-offset-3 text-blue-900 bg-blue-200 dark:bg-sky-100 dark:text-sky-800"
        type="button"
      >
        <small>see all customer reviews</small>
      </button>
    </div>
  );
};

export default CustomerReviews;
