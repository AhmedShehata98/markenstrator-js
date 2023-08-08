import React from "react";
import { CgSpinner } from "react-icons/cg";

type Props = {
  title: string;
};
function LoadingSpiner({ title }: Props) {
  return (
    <div className="mx-auto h-36 w-max flex flex-col items-center justify-center gap-4 bg-white border shadow p-3 rounded">
      <small className="uppercase font-semibold">processing {title} ...</small>
      <CgSpinner className="inline-block text-5xl animate-spin" />
    </div>
  );
}

export default LoadingSpiner;
