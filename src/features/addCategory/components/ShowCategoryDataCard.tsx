import React from "react";
import { UseFormWatch } from "react-hook-form";
import { CategoryForm } from "../../../../types";

type Props = {
  watch: UseFormWatch<CategoryForm>;
  isValidSrc: boolean;
  isFile: boolean;
};
function ShowCategoryDataCard({ isValidSrc, watch, isFile }: Props) {
  return (
    <ul className="max-md:w-full w-3/5 flex flex-col items-center justify-center gap-2 shadow-lg rounded-md border p-4 bg-white">
      <li className="w-full overflow-hidden">
        <figure className="w-full aspect-square rounded-md shadow overflow-hidden">
          {isValidSrc && (
            <img
              src={
                isFile
                  ? URL.createObjectURL(watch("image")[0] as any)
                  : watch("image")
              }
              alt="category-img-preview"
              className="w-full object-cover"
            />
          )}
        </figure>
      </li>
      <li className="text-gray-800 font-semibold capitalize mt-6">
        <h4>{watch("name")}</h4>
      </li>
      <li>
        <h4 className="text-gray-600 ">{watch("description")}</h4>
      </li>
    </ul>
  );
}

export default ShowCategoryDataCard;
