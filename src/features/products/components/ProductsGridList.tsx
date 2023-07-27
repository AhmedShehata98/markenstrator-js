import React from "react";
import { ImSpinner8 } from "react-icons/im";
import { Products } from "../../../../types";

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
        <span className="absolute left-1/2 top-1/2 flex flex-col items-center gap-3">
          <ImSpinner8 className="inline-block animate-spin text-3xl" />
          <p className="text-gray-600 capitalize">processing ...</p>
        </span>
      )}
    </ul>
  );
}

export default ProductsGridList;
