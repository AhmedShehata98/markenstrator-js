import React from "react";
import { BiTrash } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";

type Props = {
  image: {
    url: string;
    details: File;
  };
};
function ImageCard({ image: { url, details } }: Props) {
  return (
    <li key={details.name} className="relative">
      <picture className="flex justify-center w-32 h-36 overflow-hidden rounded-t">
        <img
          src={url}
          alt={details.name}
          id="image-card"
          className="max-w-full object-cover"
        />
      </picture>
      <span className="w-full flex items-center justify-center ">
        <button
          type="button"
          className="w-full flex items-center justify-center bg-red-700 text-white rounded-b p-2 text-sm capitalize hover:bg-red-500"
        >
          <BiTrash className="pointer-events-none m-auto ml-0 mr-2" />
          <p>remove</p>
        </button>
      </span>
    </li>
  );
}

export default ImageCard;
