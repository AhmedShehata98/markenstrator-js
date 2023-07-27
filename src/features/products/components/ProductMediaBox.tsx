import React from "react";

type ProductMediaBoxProps = {
  className: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const ProductMediaBox = ({
  className,
  children,
  style,
}: ProductMediaBoxProps) => {
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
};

export default ProductMediaBox;
