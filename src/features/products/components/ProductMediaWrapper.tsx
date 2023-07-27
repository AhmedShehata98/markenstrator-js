import React from "react";

type ProductMediaWrapperProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const ProductMediaWrapper = ({ children, style }: ProductMediaWrapperProps) => {
  return (
    <div
      className="relative max-w-full overflow-y-hidden overflow-x-auto snap-mandatory gap-4 flex justify-between mb-2 pt-8 pb-2 px-1"
      style={style}
    >
      {children}
    </div>
  );
};

export default ProductMediaWrapper;
