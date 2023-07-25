import React from "react";
import { UseFormWatch } from "react-hook-form";
import { CategoryForm } from "../../../../types";

type Props = {
  isFile: boolean;
  watch: UseFormWatch<CategoryForm>;
};
function PreviewThumbnailImage({ isFile, watch }: Props) {
  return (
    <figure className="w-32 rounded-full overflow-hidden aspect-square shadow-md border-4 border-violet-600">
      <img
        src={
          isFile
            ? URL.createObjectURL(watch("image")[0] as any)
            : watch("image")
        }
        alt="preview"
      />
    </figure>
  );
}

export default PreviewThumbnailImage;
