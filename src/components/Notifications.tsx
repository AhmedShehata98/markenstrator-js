import React from "react";

import { ISettingNotifications } from "../Types/pages-types";
import { useForm } from "react-hook-form";
import TogglerSwitchBtn from "./TogglerSwitchBtn";

const Notifications = () => {
  const {
    watch,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Partial<ISettingNotifications>>();

  return (
    <>
      <h5 className="font-semibold capitalize py-2 mt-3 text-gray-600 dark:text-gray-300">
        notifications
      </h5>
      <form className="flex flex-col gap-1 p-4 border border-zinc-400 dark:border-zinc-400 rounded-md">
        <div className="flex justify-between items-center">
          <span className="flex flex-col">
            <p className="capitalize font-semibold text-base text-zinc-600 dark:text-zinc-100">
              order confirmation
            </p>
            <small className="text-zinc-400 dark:text-zinc-400">
              you will receive a confirmation message when customer confirms
              order .
            </small>
          </span>
          <TogglerSwitchBtn
            htmlFor="orderConfirmation"
            id="orderConfirmation"
            {...register("orderConfirmation")}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="flex flex-col">
            <p className="capitalize font-semibold text-base text-zinc-600 dark:text-zinc-100">
              order status changed
            </p>
            <small className="text-zinc-400 dark:text-zinc-400">
              you will receive a notified when customer make changes to the
              order .
            </small>
          </span>
          <TogglerSwitchBtn
            htmlFor="orderStateChanged"
            id="orderStateChanged"
            {...register("orderStateChanged")}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="flex flex-col">
            <p className="capitalize font-semibold text-base text-zinc-600 dark:text-zinc-100">
              order deliverd
            </p>
            <small className="text-zinc-400 dark:text-zinc-400">
              you will notifed once the order is delivered.
            </small>
          </span>
          <TogglerSwitchBtn
            htmlFor="orderDelivered"
            id="orderDelivered"
            {...register("orderDelivered")}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="flex flex-col">
            <p className="capitalize font-semibold text-base text-zinc-600 dark:text-zinc-100">
              email notification
            </p>
            <small className="text-zinc-400 dark:text-zinc-400">
              turn on email notification to get updates .
            </small>
          </span>
          <TogglerSwitchBtn
            htmlFor="emailNotification"
            id="emailNotification"
            {...register("emailNotification")}
          />
        </div>
      </form>
    </>
  );
};

export default Notifications;
