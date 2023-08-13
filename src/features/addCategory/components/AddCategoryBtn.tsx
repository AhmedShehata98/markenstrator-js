import React from "react";
import { BiPlus } from "react-icons/bi";

type Props = {};
function AddCategoryBtn({}: Props) {
  return (
    <label
      htmlFor="categoty-image"
      className="w-36 flex flex-col items-center justify-center self-center aspect-square shadow-md rounded-lg border-2 border-gray-500 border-dashed mt-6 bg-white"
    >
      <BiPlus className="pointer-events-none m-auto text-5xl" />
      <p className="py-3 uppercase text-gray-600 font-medium">add thumbnail</p>
    </label>
  );
}

export default AddCategoryBtn;
