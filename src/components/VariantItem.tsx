import React, { ChangeEvent, useId } from "react";

type VariantProps = {
  children: React.ReactNode;
};
const VariantItem = ({ children }: VariantProps) => {
  return <div className="variant-item">{children}</div>;
};

export default VariantItem;
