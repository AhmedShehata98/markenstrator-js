import React from "react";
import { Order, OrderStatus } from "../../../types";
import { PiUserSquareFill } from "react-icons/pi";
import { GrOverview } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { routesList } from "../../Router/RoutesList";
import { removeOrder } from "../../lib/apiMethods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetToken from "../../Hooks/useGetToken";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  order?: Order;
};
function OrderCard({ order }: Props) {
  const navigator = useNavigate();
  const { token } = useGetToken();
  const determineOrderStatusColor = (status: OrderStatus | undefined) => {
    switch (status) {
      case "pending":
        return "text-yellow-800";
      case "completed":
        return "text-emerald-800";
      case "shipped":
        return "text-emerald-800";
      case "awaiting_fulfillment":
        return "text-teal-800";
      case "awaiting_shipment":
        return "text-blue-800";
      case "cancelled":
        return "text-red-800";
      default:
        return "text-grey-800";
    }
  };
  const identifyOrderStatusBackgroundColor = (
    status: OrderStatus | undefined
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-300";
      case "completed":
        return "bg-emerald-300";
      case "shipped":
        return "bg-emerald-300";
      case "awaiting_fulfillment":
        return "bg-teal-300";
      case "awaiting_shipment":
        return "bg-blue-300";
      case "cancelled":
        return "bg-red-300";
      default:
        return "bg-grey-300";
    }
  };
  const { invalidateQueries } = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (id: string | undefined) => removeOrder({ token, id }),
  });
  const handleRemoveOrder = async (id: string | undefined) => {
    mutateAsync(id).then(() =>
      invalidateQueries({
        queryKey: ["orders"],
        fetchStatus: "fetching",
        refetchType: "all",
        exact: true,
      })
    );
  };
  const orderFormattedDate = new Date(order?.createdAt!).toLocaleDateString();
  return (
    <li className="flex flex-col gap-1 items-start justify-start">
      <div className="flex items-center justify-between w-full capitalize font-bold p-2 rounded shadow bg-white dark:bg-zinc-800 mb-3 dark:text-gray-100">
        <span className="flex items-center justify-center gap-2">
          <i
            className={`fi fi-sr-circle-small leading-3 ${determineOrderStatusColor(
              order?.status
            )}`}
          ></i>
          <small> {order?.status.split("_").join(" ")}</small>
        </span>
        <span className="flex items-center justify-center gap-2">
          <small>{order?.products?.length}</small>
          <small>orders</small>
        </span>
      </div>
      <div className="w-full divide-y bg-white rounded p-2 shadow dark:bg-zinc-800 dark:text-gray-100 flex-col">
        <div className="flex items-center justify-between py-1">
          <figure className="flex items-center gap-2 w-max">
            <PiUserSquareFill className="inline-block text-2xl" />
            <figcaption className="capitalize font-semibold text-sm text-gray-800 dark:text-gray-50">
              {order?.userId.fullname}
            </figcaption>
          </figure>
          <span
            className={`w-2/5 flex items-center justify-center rounded-full py-2 px-3 ${determineOrderStatusColor(
              order?.status
            )} ${identifyOrderStatusBackgroundColor(order?.status)}`}
          >
            <small className="max-w-full text-center font-semibold capitalize overflow-hidden truncate">
              {order?.status.split("_").join(" ")}
            </small>
          </span>
        </div>
        <span className="flex justify-between items-center capitalize py-2 ">
          <small>order ID</small>
          <p className="w-4/6A font-bold text-sm truncate overflow-hidden">
            {order?._id}
          </p>
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>method</small>
          {order?.payment.method.split("_").join(" ")}
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>date</small>
          <p className="font-bold text-sm">{orderFormattedDate}</p>
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>total</small>
          <p className="font-bold text-sm">{order?.totalPrice}</p>
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>discounted total</small>
          <p className="font-bold text-sm">{order?.discountedTotal}</p>
        </span>
        <span className="grid grid-cols-1 md:grid-cols-3 justify-between items-center w-full h-14 gap-2">
          <button
            className="flex items-center justify-center bg-gray-100 rounded h-12 border hover:bg-slate-200 dark:bg-zinc-700 dark:border-slate-500"
            type="button"
            title="delete order"
            disabled={isLoading}
            onClick={() => handleRemoveOrder(order?._id)}
          >
            {isLoading && (
              <ImSpinner8 className="inline-block text-2xl animate-spin" />
            )}
            {!isLoading && (
              <i className="fi fi-sr-trash leading text-red-500 dark:text-red-300"></i>
            )}
          </button>
          <button
            className="flex items-center justify-center bg-gray-100 rounded h-12 border hover:bg-slate-200 dark:bg-zinc-700 dark:border-slate-500"
            type="button"
            title="print"
          >
            <i className="fi fi-sr-print leading text-slate-500 dark:text-zinc-200 "></i>
          </button>
          <button
            onClick={() =>
              navigator(routesList.orderDetails, {
                state: { order: order?._id },
              })
            }
            className="flex items-center justify-center bg-gray-100 rounded h-12 border hover:bg-slate-200 dark:bg-zinc-700 dark:border-slate-500"
            type="button"
            title="see more"
          >
            <GrOverview className="text-slate-500 dark:text-zinc-200 " />
          </button>
        </span>
      </div>
    </li>
  );
}

export default OrderCard;
