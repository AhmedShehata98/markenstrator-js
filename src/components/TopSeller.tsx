import React from "react";

const TopSeller = () => {
  return (
    <div className="bg-white rounded-md p-3 shadow dark:bg-zinc-800 ">
      <p className="font-bold text-base capitalize text-gray-700 dark:text-zinc-100">
        top seller
      </p>
      <span className="flex gap-2 items-center justify-between capitalize mb-3 mt-2 w-full">
        <p className="font-bold text-sm text-gray-500 text-start w-1/3 dark:text-zinc-400">
          profile
        </p>
        <p className="font-bold text-sm text-gray-500 text-center w-1/3 dark:text-zinc-400">
          country
        </p>
        <p className="font-bold text-sm text-gray-500 text-end w-1/3 dark:text-zinc-400">
          product
        </p>
      </span>
      <div className="w-full flex flex-col gap-2">
        <span className="flex items-center justify-between  capitalize">
          <span className="flex items-center gap-3 w-1/3">
            <img
              className="w-7 h-7 rounded-full aspect-square"
              src="https://picsum.photos/200"
              alt="user"
            />
            <p className="font-bold text-xs text-gray-700 dark:text-zinc-100">
              john doe3
            </p>
          </span>
          <p className="font-bold text-xs text-center text-gray-700 w-1/3 dark:text-zinc-100">
            Mooroco
          </p>
          <p className="font-bold text-xs text-end text-gray-700 w-1/3 dark:text-zinc-100">
            1594
          </p>
        </span>
        <span className="flex items-center justify-between  capitalize">
          <span className="flex items-center gap-3 w-1/3">
            <img
              className="w-7 h-7 rounded-full aspect-square"
              src="https://picsum.photos/200"
              alt="user"
            />
            <p className="font-bold text-xs text-gray-700 dark:text-zinc-100">
              john doe 2
            </p>
          </span>
          <p className="font-bold text-xs text-center text-gray-700 w-1/3 dark:text-zinc-100">
            Tunisa
          </p>
          <p className="font-bold text-xs text-end text-gray-700 w-1/3 dark:text-zinc-100">
            257
          </p>
        </span>
        <span className="flex items-center justify-between  capitalize">
          <span className="flex items-center gap-3 w-1/3">
            <img
              className="w-7 h-7 rounded-full aspect-square"
              src="https://picsum.photos/200"
              alt="user"
            />
            <p className="font-bold text-xs text-gray-700 dark:text-zinc-100">
              john doe
            </p>
          </span>
          <p className="font-bold text-xs text-center text-gray-700 w-1/3 dark:text-zinc-100">
            egypt
          </p>
          <p className="font-bold text-xs text-end text-gray-700 w-1/3 dark:text-zinc-100">
            1440
          </p>
        </span>
        <span className="flex items-center justify-between capitalize">
          <span className="flex items-center gap-3 w-1/3">
            <img
              className="w-7 h-7 rounded-full aspect-square"
              src="https://picsum.photos/200"
              alt="user"
            />
            <p className="font-bold text-xs text-gray-700 dark:text-zinc-100">
              john doe
            </p>
          </span>
          <p className="font-bold text-xs text-center text-gray-700 w-1/3 dark:text-zinc-100">
            sudia Arabic
          </p>
          <p className="font-bold text-xs text-end text-gray-700 w-1/3 dark:text-zinc-100">
            589
          </p>
        </span>
      </div>
    </div>
  );
};

export default TopSeller;
