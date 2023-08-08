import React from "react";
import InputGroup from "../../components/InputGroup";
import { Order, OrderStatus } from "../../../types";
import { CgSpinner } from "react-icons/cg";
import LoadingSpiner from "../../components/LoadingSpiner";

type Props = {
  order: Order;
  apiCallState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
};

function OrderDetailsWrapper({
  order,
  apiCallState: { isError, isLoading, isSuccess },
}: Props) {
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
  return (
    <form action="" className="w-full bg-white p-3">
      {isLoading && <LoadingSpiner title="order details" />}
      {isSuccess && (
        <>
          <div className="w-full flex max-sm:flex-col items-center justify-between gap-3 pb-5">
            <InputGroup width={"33%"} dir="col" extraClassName="max-md:!w-full">
              <label className="form-label" htmlFor="fullname">
                full name
              </label>
              <input
                className="form-input"
                type="text"
                id="fullname"
                placeholder="full name ...."
                defaultValue={order.userId.fullname}
                readOnly
                disabled={true}
              />
            </InputGroup>
            <InputGroup width={"33%"} dir="col" extraClassName="max-md:!w-full">
              <label className="form-label" htmlFor="email">
                full name
              </label>
              <input
                className="form-input"
                type="text"
                id="email"
                placeholder="email address ...."
                defaultValue={order.userId.email}
                readOnly
                disabled={true}
              />
            </InputGroup>
            <InputGroup width={"33%"} dir="col" extraClassName="max-md:!w-full">
              <label className="form-label" htmlFor="phone">
                phone number
              </label>
              <input
                className="form-input"
                type="text"
                id="phone"
                placeholder="phone number ...."
                defaultValue={order.userId.phone}
                readOnly
                disabled={true}
              />
            </InputGroup>
          </div>
          <div className="w-full flex max-sm:flex-col max-md:items-start items-center justify-around gap-3 pb-5 my-5">
            <span>
              <p>order status :</p>
              <code
                className={`inline-block px-3 py-1 mt-2 rounded-full font-bold capitalize ${determineOrderStatusColor(
                  order?.status
                )} ${identifyOrderStatusBackgroundColor(order?.status)}`}
              >
                {order?.status?.split("_").join(" ")}
              </code>
            </span>
            <span>
              <p>pay method :</p>
              <code className="inline-block px-3 py-1 rounded-full mt-2 bg-gray-600 text-white font-bold capitalize">
                {order?.payment.method?.split("_").join(" ")}
              </code>
            </span>
            <span>
              <p>discounted total :</p>
              <code className="inline-block px-3 py-1 rounded-full mt-2 bg-violet-600 text-white font-bold capitalize">
                {order?.discountedTotal?.toLocaleString("en-eg", {
                  style: "currency",
                  currency: "egp",
                })}
              </code>
            </span>
            <span>
              <p> total price :</p>
              <code className="inline-block px-3 py-1 rounded-full mt-2 bg-violet-600 text-white font-bold capitalize">
                {order?.totalPrice?.toLocaleString("en-eg", {
                  style: "currency",
                  currency: "egp",
                })}
              </code>
            </span>
            <span>
              <p> order requested at :</p>
              <code className="inline-block px-3 py-1 rounded-full mt-2 bg-violet-600 text-white font-bold capitalize">
                {Intl.DateTimeFormat("en-eg", {
                  dateStyle: "full",
                }).format(new Date(order?.createdAt))}
              </code>
            </span>
          </div>
        </>
      )}
    </form>
  );
}

export default OrderDetailsWrapper;
