import React from "react";
import { BiPlus } from "react-icons/bi";

type Props = {
  handleOnSelect: React.ChangeEventHandler<HTMLInputElement>;
  imagesLength: number;
};
function SelectImageBtn({ handleOnSelect, imagesLength }: Props) {
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
        name="product-image"
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
