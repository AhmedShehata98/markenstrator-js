import React, { useLayoutEffect, useRef } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { IAllProductsData } from "../Types/pages-types";
import { SET_ADD_PRODUCT_INITIAL_STATE } from "../Redux/Slice/AppSlice";
import { nanoid } from "@reduxjs/toolkit";
import { routesList } from "../Router/RoutesList";
import { Products } from "../../types";
import { ImSpinner8 } from "react-icons/im";
type Props = {
  productsData: Products[];
  children?: React.ReactNode;
  apiCallState: { isLoading: boolean; isSuccess: boolean };
  productsView: "list" | "grid";
};

function ProductsTableList({
  productsData,
  children,
  apiCallState: { isLoading, isSuccess },
  productsView,
}: Props) {
  const renderChildren = (product: Products) =>
    React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement, {
        key: product._id,
        product,
      });
    });

  return (
    <article
      className={`product-table-list ${
        productsView !== "list" ? "hidden" : ""
      }`}
    >
      <table className="w-full h-fit rounded-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-700 dark:text-white capitalize text-sm border-b border-gray-300 dark:border-gray-400 ">
            <th className="py-2 pl-3 text-start uppercase min-w-max ">
              product code
            </th>
            <th className="py-2 pl-3 text-start uppercase">item</th>
            <th className="py-2 pl-3 text-start uppercase">type</th>
            <th className="py-2 pl-3 text-start uppercase">changes</th>
            <th className="py-2 pl-3 text-start uppercase">price</th>
            <th className="py-2 pl-3 text-start uppercase">sold</th>
            <th className="py-2 pl-3 text-start uppercase">sales</th>
            <th className="py-2 pl-3 text-start uppercase"></th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            !isLoading &&
            productsData.map((product) => renderChildren(product))}
          {isLoading && (
            <ImSpinner8 className="inline-block animate-spin text-xl" />
          )}
        </tbody>
      </table>
    </article>
  );
}

export default ProductsTableList;
