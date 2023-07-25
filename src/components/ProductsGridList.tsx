import React from "react";
import { Products } from "../../types";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  productsData: Products[];
  children?: React.ReactNode;
  apiCallState: { isLoading: boolean; isSuccess: boolean };
  productsView: "list" | "grid";
};
function ProductsGridList({
  apiCallState: { isLoading, isSuccess },
  productsData,
  productsView,
  children,
}: Props) {
  const renderChildren = (product: Products) =>
    React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement, {
        key: product._id,
        product,
      });
    });
  return (
    <ul
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ${
        productsView !== "grid" ? "hidden" : ""
      }`}
    >
      {isSuccess &&
        !isLoading &&
        productsData.map((product) => renderChildren(product))}
      {isLoading && (
        <ImSpinner8 className="inline-block animate-spin text-xl" />
      )}
    </ul>
  );
}

export default ProductsGridList;
