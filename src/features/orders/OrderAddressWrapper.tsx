import React from "react";
import { Address } from "../../../types";
import LoadingSpiner from "../../components/LoadingSpiner";

type Props = {
  addressData: Address | undefined;
  fullname: string | undefined;
  children: React.ReactNode | React.ReactNode[];
  apiCallState: { isLoading: boolean; isSuccess: boolean; isError: boolean };
};
export default function OrderAddressWrapper({
  addressData,
  children,
  fullname,
  apiCallState: { isError, isLoading, isSuccess },
}: Props) {
  const renderAddressChildren = (
    address: Address | undefined,
    fullname: string | undefined
  ) =>
    React.Children.map(children, (child) => {
      return React.cloneElement(
        child as React.DetailedReactHTMLElement<any, HTMLElement>,
        { key: address?._id, address, fullname }
      );
    });
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <h3 className="mt-4 uppercase font-semibold text-gray-600">
        address details :
      </h3>
      <ul className="w-full flex items-start justify-start bg-white border shadow my-4 px-2">
        {isSuccess && renderAddressChildren(addressData, fullname)}
      </ul>
      {isLoading && <LoadingSpiner title="address" />}
    </div>
  );
}
