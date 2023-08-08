import React from "react";
import { Address } from "../../../types";
import { MdOutlineWork } from "react-icons/md";
import { FaHome } from "react-icons/fa";

type Props = {
  address?: Address;
  fullname?: string | undefined;
};
export default function AddressCard({ address, fullname }: Props) {
  console.log(address);
  return (
    <li className="w-full md:w-8/12 flex flex-col items-start p-3">
      <div className="w-full flex items-center justify-start gap-3 py-2 mb-4 border-b-2">
        <span className="text-xl text-violet-700">
          {address?.addressLabel === "Work" ? <MdOutlineWork /> : <FaHome />}
        </span>
        <p>{address?.addressLabel}</p>
      </div>
      <span className="w-full flex items-center justify-start gap-4 mb-2">
        <p className="font-bold text-gray-600 capitalize">name :</p>
        <p className="text-sm text-gray-900 capitalize font-medium">
          {fullname}
        </p>
      </span>
      <div className="w-full flex items-center justify-start gap-4 mb-4">
        <p className="w-max font-bold text-gray-600 capitalize">locatin :</p>
        <span className="flex items-center justify-start flex-wrap gap-1 text-sm text-gray-900 capitalize font-medium">
          <p>{address?.postalCode}</p> <p>{address?.additionalLandmarks}</p> ,{" "}
          <p>{address?.street}</p> , <p>{address?.province}</p>,{" "}
          <p>{address?.city}</p>, <p>{address?.country}</p>
        </span>
      </div>
      <span className="w-full flex items-center justify-start gap-4 mb-2">
        <p className="font-bold text-gray-600 capitalize">phone :</p>
        <p className="text-sm text-gray-900 capitalize font-medium">
          {address?.contactPhone}
        </p>
      </span>
    </li>
  );
}
