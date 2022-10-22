import React, { MouseEventHandler } from "react";

type PreviewUploadedMediaProps = {
  imageSrc: string;
  alt: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const PreviewUploadedMedia = ({
  onClick,
  imageSrc,
  alt,
}: PreviewUploadedMediaProps) => {
  return (
    <figure className="h-28 w-28 overflow-hidden ">
      <img
        className="aspect-square min-w-full object-cover"
        src={imageSrc}
        alt={alt}
      />
      <button
        type="button"
        className="px-2 py-1 rounded-sm opacity-60 absolute top-2 right-2 z-10 transition-opacity hover:opacity-100 bg-gray-200 dark:bg-gray-700 border border-zinc-500"
        onClick={onClick}
      >
        <i className="fi fi-sr-trash leading-3 text-red-700 dark:text-red-300"></i>
      </button>
    </figure>
  );
};

export default PreviewUploadedMedia;
