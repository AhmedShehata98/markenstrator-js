import React from "react";
import { Order, Products } from "../../../types";

type Props = {
  products: Pick<Order, "products">;
  children: React.ReactNode | React.ReactNode[];
  apiCallState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
};
function OrderProductsWrapper({
  products,
  children,
  apiCallState: { isError, isLoading, isSuccess },
}: Props) {
  const renderProductsChildren = (product: Partial<Products>) =>
    React.Children.map(children, (child) =>
      React.cloneElement(child as any, { key: product._id, product })
    );
  return (
    <div className="w-full overflow-x-auto my-4">
      <h3 className="mt-4 mb-3 uppercase font-semibold text-gray-600">
        products :
      </h3>
      <ul className="flex items-start justify-start gap-3">
        {isSuccess &&
          products.products.map((product) => renderProductsChildren(product))}
      </ul>
    </div>
  );
}

export default OrderProductsWrapper;
