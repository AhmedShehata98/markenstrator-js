import React, { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISettingPassword } from "../Types/pages-types";

const ChangePassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ISettingPassword>>();

  const sendPasswordChangeRequist: SubmitHandler<Partial<ISettingPassword>> = (
    data
  ) => {
    console.log(data);
  };
  return (
    <>
      <h5 className="font-semibold capitalize py-2 text-gray-600 dark:text-gray-300">
        change password
      </h5>
      <form
        onSubmit={handleSubmit(sendPasswordChangeRequist)}
        className="flex flex-col gap-1 p-4 border border-zinc-400 dark:border-zinc-400 rounded-md"
      >
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="current-password"
          >
            current password
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500"
            type="password"
            id="current-password"
            placeholder="enter old password .."
            {...register("currentPassword", {
              required: "your old password is required",
            })}
          />
          {Boolean(errors.currentPassword) && (
            <small className="text-red-500">
              {errors.currentPassword?.message}
            </small>
          )}
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="new-password"
          >
            new password
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500"
            type="password"
            id="new-password"
            placeholder="enter new password.."
            {...register("newPassword", {
              required: "new password is required",
            })}
          />
          {Boolean(errors.newPassword) && (
            <small className="text-red-500">
              {errors.newPassword?.message}
            </small>
          )}
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="confirm-password .."
          >
            confirm password
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500"
            type="password"
            id="confirm-password"
            placeholder="re-enter your new password .."
            {...register("confirmPassword", {
              required: "please re-enter new password ",
            })}
          />
          {Boolean(errors.confirmPassword) && (
            <small className="text-red-500">
              {errors.confirmPassword?.message}
            </small>
          )}
        </span>
        <button
          className="rounded-lg px-10 lg:px-5 py-2 mt-4 self-center lg:self-end capitalize text-sm font-medium bg-violet-600 text-zinc-100 hover:bg-violet-500 dark:bg-violet-300 dark:text-black dark:hover:bg-violet-400"
          type="submit"
        >
          change password
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
