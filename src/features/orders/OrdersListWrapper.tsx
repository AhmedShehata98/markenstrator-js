import React from "react";
import { Order } from "../../../types";
import { CgSpinner } from "react-icons/cg";

type Props = {
  orders: Order[];
  children: React.ReactNode | React.ReactNode[];
  apiCallState: { isLoading: boolean; isSuccess: boolean; isError: boolean };
};
function OrdersListWrapper({
  children,
  orders,
  apiCallState: { isError, isLoading, isSuccess },
}: Props) {
  const renderOrdersChildren = (order: Order) =>
    React.Children.map(children, (child) =>
      React.cloneElement(child as any, { order })
    );
  return (
    <div className="w-full flex items-start justify-start gap-1 pe-4">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {isSuccess &&
          !isLoading &&
          orders?.map((order) => renderOrdersChildren(order))}
        {isLoading && (
          <div className="mx-auto h-[50vh] flex flex-col items-center justify-center gap-2">
            <small className="uppercase font-medium">
              processing orders ...
            </small>
            <CgSpinner className="inline-block text-5xl animate-spin" />
          </div>
        )}
      </ul>
    </div>
  );
}

export default OrdersListWrapper;
