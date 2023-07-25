import React from "react";
import { UseFormWatch } from "react-hook-form";
import { CategoryForm } from "../../../../types";

type Props = {
  isFile: boolean;
  watch: UseFormWatch<CategoryForm>;
};
function PreviewThumbnailTitle({ isFile, watch }: Props) {
  return (
    <figcaption className="text-gray-600">
      {isFile && (watch("image")[0] as any).name}
    </figcaption>
  );
}

export default PreviewThumbnailTitle;
