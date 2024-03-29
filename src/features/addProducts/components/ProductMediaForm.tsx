import { useCallback, useEffect, useMemo, useState } from "react";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import ImageCard from "./ImageCard";
import SelectImageBtn from "./SelectImageBtn";
import { useMutation } from "@tanstack/react-query";
import { uploadProductImage } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ProductForm, ProductUploadImage } from "../../../../types";
import { useLocation } from "react-router-dom";

export type ImageData = {
  url: string;
  details: File;
};

type Props = {
  register: UseFormRegister<ProductForm>;
  setValue: UseFormSetValue<ProductForm>;
  watch: UseFormWatch<ProductForm>;
};
function ProductMediaForm({ setValue, register, watch }: Props) {
  const [mediaList, setMediaList] = useState<ImageData[] | null>(null);
  const { state } = useLocation();

  const handleGetImages = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files!).slice(0, 6);
    const formdata = new FormData();
    files.forEach((file) => formdata.append("product-image", file));
    let images = files.map((file) => ({
      details: file,
      url: URL.createObjectURL(file),
    }));
    setMediaList(images);
    setValue("images", files);
  };

  const createImaegsDataFromUrl = useCallback(() => {
    if (Array.isArray(watch("images"))) {
      let newImagesData = (watch("images") as any[])?.map((prod) => ({
        url: prod.url,
        details: { name: "NA-NA" },
      })) as ImageData[];

      setMediaList(newImagesData);
    }
  }, [watch("images")]);

  useEffect(() => {
    if (state) {
      if (state.isUpdateProduct) {
        createImaegsDataFromUrl();
      }
    }
  }, [createImaegsDataFromUrl]);

  return (
    <ul className="max-w-full flex gap-2 mb-6 overflow-x-auto">
      {mediaList?.map((image, index) => (
        <ImageCard key={index} image={image} />
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
        register={register}
      />
    </ul>
  );
}

export default ProductMediaForm;
