import React from "react";
import { Order } from "../../../types";
import { CgSpinner } from "react-icons/cg";
import LoadingSpiner from "../../components/LoadingSpiner";

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
    <div className="w-full flex flex-col items-center justify-center gap-1 pe-4">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {isSuccess &&
          !isLoading &&
          orders?.map((order) => renderOrdersChildren(order))}
      </ul>
      {isLoading && <LoadingSpiner title="orders" />}
    </div>
  );
}

export default OrdersListWrapper;
