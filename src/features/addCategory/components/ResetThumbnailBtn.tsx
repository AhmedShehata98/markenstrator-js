import React from "react";
type Props = {
  onReset: React.MouseEventHandler;
};
function ResetThumbnailBtn({ onReset }: Props) {
  return (
    <button
      type="button"
      className="px-3 py-1 shadow bg-violet-700 rounded text-white capitalize hover:bg-violet-500"
      onClick={onReset}
    >
      reset thumbnail
    </button>
  );
}

export default ResetThumbnailBtn;
