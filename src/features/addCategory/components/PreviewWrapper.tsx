import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  isValidSrc: boolean;
};
function PreviewWrapper({ children, isValidSrc }: Props) {
  return (
    <div className="flex items-center justify-center max-md:flex-col">
      {isValidSrc ? children : null}
    </div>
  );
}

export default PreviewWrapper;
