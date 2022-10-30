import React from "react";

type OrderCardProps = {
  orderState: "pending" | "paid" | "cancelled" | "refunded";
  userImg: string;
  username: string;
  paymentMethod: {
    method: "card" | "cash";
    info: string | "when dilivered";
  };
  orderID: string;
  orderDate: string | Date;
  price: string | number;
  ordersCount: number;
  onClick: React.MouseEventHandler;
};
const OrderCard = ({
  price,
  orderDate,
  paymentMethod,
  orderID,
  username,
  ordersCount,
  userImg,
  orderState,
  onClick,
}: OrderCardProps) => {
  function hideCreditCardNumber(number: string): string {
    const creditNumToArr = Array.from(number);
    const creditHideNumber: string[] = [];
    creditNumToArr.forEach((number, index) =>
      number.length > index - 3
        ? creditHideNumber.push(number)
        : creditHideNumber.push("*")
    );
    //
    return creditHideNumber.join("");
  }
  return (
    <li className="flex flex-col gap-1 items-start justify-start">
      <div className="flex items-center justify-between w-full capitalize font-bold p-2 rounded shadow bg-white dark:bg-zinc-800 mb-3 dark:text-gray-100">
        <span className="flex items-center justify-center gap-2">
          {orderState === "pending" && (
            <i className="fi fi-sr-circle-small leading-3 text-yellow-500"></i>
          )}
          {orderState === "refunded" && (
            <i className="fi fi-sr-circle-small leading-3 text-zinc-900"></i>
          )}
          {orderState === "paid" && (
            <i className="fi fi-sr-circle-small leading-3 text-emerald-500"></i>
          )}
          {orderState === "cancelled" && (
            <i className="fi fi-sr-circle-small leading-3 text-red-500"></i>
          )}
          <small> {orderState}</small>
        </span>
        <span className="flex items-center justify-center gap-2">
          <small>{ordersCount}</small>
          <small>orders</small>
        </span>
      </div>
      <div className="w-full divide-y bg-white rounded p-2 shadow dark:bg-zinc-800 dark:text-gray-100 flex-col">
        <span className="flex items-center justify-between py-1">
          <figure className="flex items-center gap-2 w-2/3">
            <img
              className="block w-10 aspect-square rounded-full shadow-md"
              src={userImg}
              alt="user-img"
            />
            <figcaption className="capitalize font-semibold text-gray-800 dark:text-gray-50">
              {username}
            </figcaption>
          </figure>
          {orderState === "paid" && (
            <small className="rounded-xl text-center font-medium capitalize w-1/4 text-emerald-800 bg-emerald-200 py-[2px]">
              {orderState}
            </small>
          )}
          {orderState === "pending" && (
            <small className="rounded-xl text-center font-medium capitalize w-1/4 text-yellow-900 bg-yellow-200 py-[2px]">
              {orderState}
            </small>
          )}
          {orderState === "refunded" && (
            <small className="rounded-xl text-center font-medium capitalize w-1/3 text-slate-900 bg-slate-300 py-[2px]">
              {orderState}
            </small>
          )}
          {orderState === "cancelled" && (
            <small className="rounded-xl text-center font-medium capitalize w-1/3 text-red-900 bg-red-300 py-[2px]">
              {orderState}
            </small>
          )}
        </span>
        <span className="flex justify-between items-center capitalize py-2 ">
          <small>order ID</small>
          <p className="font-bold text-sm">{orderID}</p>
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>method</small>
          {paymentMethod.method === "card" ? (
            <p className="font-bold text-sm">
              {hideCreditCardNumber(paymentMethod.info)}
            </p>
          ) : (
            <p className="font-bold text-sm">{paymentMethod.info}</p>
          )}
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>date</small>
          <p className="font-bold text-sm">{orderDate.toString()}</p>
        </span>
        <span className="flex justify-between items-center capitalize py-2">
          <small>price</small>
          <p className="font-bold text-sm">{price}</p>
        </span>
        <span className="flex justify-between items-center w-full h-14">
          <button
            className="w-[47%] bg-gray-100 rounded h-12 border hover:bg-slate-200 dark:bg-zinc-700 dark:border-slate-500"
            type="button"
            onClick={onClick}
          >
            <i className="fi fi-sr-trash leading text-red-500 dark:text-red-300"></i>
          </button>
          <button
            className="w-[47%] bg-gray-100 rounded h-12 border hover:bg-slate-200 dark:bg-zinc-700 dark:border-slate-500"
            type="button"
          >
            <i className="fi fi-sr-print leading text-slate-500 dark:text-zinc-200 "></i>
          </button>
        </span>
      </div>
    </li>
  );
};

export default OrderCard;
