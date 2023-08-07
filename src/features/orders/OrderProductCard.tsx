import React from "react";
import { Products } from "../../../types";

type Props = {
  product?: {
    productId: Products;
    quantity: number;
  };
};
function OrderProductCard({ product }: Props) {
  return (
    <li className="basis-44 flex items-start justify-center flex-col bg-white p-3 border shadow">
      <figure className="w-full h-40 pt-2">
        <img
          src={
            typeof product?.productId?.thumbnail === "string"
              ? product?.productId?.thumbnail
              : (product?.productId?.thumbnail as any).url
          }
          alt="prod-img"
        />
      </figure>
      <small className="h-8 leading-4 text-violet-700 font-bold capitalize overflow-hidden">
        {product?.productId?.name}
      </small>
      <code className="mt-2 font-medium">
        {product?.productId?.price?.toLocaleString("en-eg", {
          style: "currency",
          currency: "egp",
        })}
      </code>
    </li>
  );
}

export default OrderProductCard;
