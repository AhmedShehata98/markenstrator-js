import { useState } from "react";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import ImageCard from "./ImageCard";
import SelectImageBtn from "./SelectImageBtn";
import { useMutation } from "@tanstack/react-query";
import { uploadProductImage } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";

export type ImageData = {
  url: string;
  details: File;
};

type Props = {};
function ProductMediaForm({}: Props) {
  const [mediaList, setMediaList] = useState<ImageData[] | null>(null);

  const handleGetImages = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files!).slice(0, 6);
    const formdata = new FormData();
    files.forEach((file) => formdata.append("product-image", file));
    let images = files.map((file) => ({
      details: file,
      url: URL.createObjectURL(file),
    }));
    setMediaList(images);
  };

  return (
    <ul className="max-w-full flex gap-2 mb-6 overflow-x-auto">
      {mediaList?.map((image) => (
        <ImageCard key={image.details.name} image={image} />
      ))}

      {mediaList === null && (
        <span className="flex flex-col items-center justify-center gap-3">
          <h4 className="text-sm font-semibold text-gray-500 self-center capitalize px-3 ">
            max allowed images length is (6) images .
          </h4>
          <MdPhotoSizeSelectActual className="text-5xl" />
        </span>
      )}

      <SelectImageBtn
        imagesLength={mediaList?.length!}
        handleOnSelect={(ev) => handleGetImages(ev)}
      />
    </ul>
  );
}

export default ProductMediaForm;
