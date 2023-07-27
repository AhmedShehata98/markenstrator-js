import React from "react";
import { UseFormRegister } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { ProductForm } from "../../../../types";

type Props = {
  handleOnSelect: React.ChangeEventHandler<HTMLInputElement>;
  imagesLength: number;
  register: UseFormRegister<ProductForm>;
};
function SelectImageBtn({ handleOnSelect, imagesLength, register }: Props) {
  return (
    <li className={`${imagesLength >= 6 && "hidden"} image-add-btn`}>
      <label
        htmlFor="product-image"
        className="w-full h-24 flex text-5xl text-gray-500 cursor-pointer"
      >
        <BiPlus className="pointer-events-none m-auto" />
      </label>
      <input
        type="file"
        {...register("images")}
        id="product-image"
        hidden
        onChange={handleOnSelect}
        multiple
        accept="image/*"
      />
      <p className="text-sm text-center font-medium capitalize py-2">
        add image
      </p>
    </li>
  );
}

export default SelectImageBtn;
