import React, { useEffect, useLayoutEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { ISettingProfile } from "../Types/pages-types";
import useGetToken from "../Hooks/useGetToken";
import { getUserData } from "../lib/apiMethods";
import { useQuery } from "@tanstack/react-query";

const EditProfile = () => {
  const { token } = useGetToken();
  const {
    data: userData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: () => getUserData(token),
    queryKey: ["user-data"],
    enabled: Boolean(token),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<ISettingProfile>>();

  const sendProductData: SubmitHandler<Partial<ISettingProfile>> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (Boolean(token) && isSuccess) {
      reset({
        avatarUrl: "",
        fullname: `${userData?.data.user.fullname}` ?? "",
        company_store_Name: "NA-NA",
        location: "NA-NA",
        currency: "NA-NA",
        email: userData?.data.user.email ?? "",
        phone: userData?.data.user.phone ?? "",
        address: "NA-NA",
      });
      console.log(userData);
    }
  }, [token, isSuccess, isLoading]);
  return (
    <>
      <h5 className="font-semibold capitalize py-2 text-gray-600 dark:text-gray-300">
        edit profile
      </h5>
      <form
        onSubmit={handleSubmit(sendProductData)}
        className="flex flex-col gap-1 p-4 border border-zinc-400 dark:border-zinc-400 rounded-md"
      >
        <div className="flex items-center justify-around gap-1 p-2 w-full lg:w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded-md">
          <figure className="h-24">
            <img
              className="max-w-full h-20 aspect-square object-cover rounded-full"
              src="https://picsum.photos/200"
              alt="user-img"
            />
          </figure>
          <span className="flex flex-col items-start justify-center">
            <label
              htmlFor="userImage"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              change profile photo
            </label>
            <input
              className="block mb-1 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              id="userImage"
              {...register("avatarUrl")}
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PNG, JPG (MAX. 800x400px).
            </p>
          </span>
        </div>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="fullname"
          >
            fullname
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="text"
            id="fullname"
            placeholder="Ex : John Doe ..."
            {...register("fullname")}
          />
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="company-name"
          >
            company/store name
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="text"
            id="company-name"
            placeholder="Ex : MyCompany .CO ..."
            {...register("company_store_Name")}
          />
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="location"
          >
            location
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="text"
            id="location"
            placeholder="Ex : Egypt ..."
            {...register("location")}
          />
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="currency"
          >
            currency
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="text"
            id="currency"
            placeholder="Ex : EGP .."
            {...register("currency")}
          />
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label className="text-sm capitalize dark:text-white" htmlFor="email">
            email
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="email"
            id="email"
            placeholder="Ex : example@example.com"
            {...register("email")}
          />
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label className="text-sm capitalize dark:text-white" htmlFor="phone">
            phone
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="tel"
            id="phone"
            placeholder="ex : 01035........"
            {...register("phone")}
          />
        </span>
        <span className="flex flex-col items-start justify-start gap-1">
          <label
            className="text-sm capitalize dark:text-white"
            htmlFor="address"
          >
            address
          </label>
          <input
            className="bg-zinc-100 border border-zinc-300 px-2 py-1 outline-none dark:bg-zinc-700 dark:border-zinc-500 w-full lg:w-2/3 dark:text-zinc-100"
            type="text"
            id="address"
            placeholder="Ex : St 241 , start name , city ..."
            {...register("address")}
          />
        </span>
        <button
          className="rounded-lg px-10 lg:px-5 py-2 mt-4 self-center lg:self-end capitalize text-sm font-medium bg-violet-600 text-zinc-100 hover:bg-violet-500 dark:bg-violet-300 dark:text-black dark:hover:bg-violet-400"
          type="submit"
        >
          change changes
        </button>
      </form>
    </>
  );
};

export default EditProfile;
