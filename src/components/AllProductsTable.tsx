import React, { useLayoutEffect, useRef } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { IAllProductsData } from "../Types/pages-types";
import { SET_ADD_PRODUCT_INITIAL_STATE } from "../Redux/Slice/AppSlice";
import { nanoid } from "@reduxjs/toolkit";
import { routesList } from "../Router/RoutesList";
type AllProductsTableProps = {
  AllProductsTableData: Partial<IAllProductsData>[];
  children?: React.ReactNode;
};
// interface AllProductsTableData {
//   id: string;
//   productSKUcode: string;
//   Product: {
//     name: string;
//     image: string;
//   };
//   category: string;
//   changesRate: string | number;
//   price: string | number;
//   sold: string;
//   sales: string | number;
// }

function AllProductsTable({ AllProductsTableData }: AllProductsTableProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const optionsMenuRef = useRef<HTMLUListElement | null>(null);

  const handleShowProductDetails = (
    productDetails: Partial<IAllProductsData>
  ) => {
    dispatch(SET_ADD_PRODUCT_INITIAL_STATE(productDetails));
    // redirect(routesList.addProducts, { status: 200, statusText: "OK" });
    navigate(routesList.addProducts);
    console.log("redirect");
  };

  const handleShowOptionsMenu = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLElement;
    const tRow = element.closest("td") as HTMLTableDataCellElement;
    const optionMenu = tRow.children[1];
    optionMenu.classList.toggle("pd-table-opt-menu-hide");
  };

  return (
    <article className="mt-8 mb-2 px-2 pb-2 flex flex-col items-start justify-center w-full border dark:border-zinc-400 bg-gray-100 dark:bg-zinc-700">
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
          {AllProductsTableData && AllProductsTableData.length > 1 ? (
            AllProductsTableData.map((product, index) => {
              return (
                <tr
                  key={nanoid(4)}
                  className="py-3 pl-3 text-start text-sm dark:text-gray-100 capitalize bg-gray-100 dark:bg-zinc-700 border-b border-zinc-300 dark:border-zinc-600"
                >
                  <td className="py-2 pl-3 text-start ">
                    <p className="max-w-full truncate">{product.sku}</p>
                  </td>
                  <td className="py-2 pl-3 text-start flex gap-3">
                    <button
                      className="flex items-center gap-2 justify-center cursor-pointer"
                      type="button"
                      onClick={() => handleShowProductDetails(product)}
                    >
                      <figure className="w-8 rounded-full aspect-square shadow m-0">
                        <img
                          className="max-w-full object-cover rounded-full"
                          src={product?.media?.[0].fileLivePreview}
                          alt={"product-media" + " " + "#" + index}
                        />
                      </figure>
                      <figcaption className=" grid place-items-start place-content-center text-sm font-semibold capitalize text-gray-600 dark:text-gray-300 max-w-full truncate">
                        {product.productName}
                      </figcaption>
                    </button>
                  </td>
                  <td className="py-2 pl-3 text-start ">
                    <p className="bg-slate-500 dark:bg-slate-400 dark:text-black text-white text-center rounded-full px-3 py-[2px] max-w-full truncate">
                      {product.category}
                    </p>
                  </td>
                  <td>
                    <p className=" dark:text-white  text-center rounded-full px-3 py-[2px] max-w-full truncate">
                      {Intl.NumberFormat("en-EG", {
                        style: "percent",
                        signDisplay: "exceptZero",
                      }).format(+product.changes!)}
                    </p>
                  </td>
                  <td className="py-2 pl-3 text-start ">
                    <p className="max-w-full truncate">
                      {Intl.NumberFormat("en-EG", {
                        style: "currency",
                        currency: product.price?.unit,
                      }).format(product.price?.value as number)}
                    </p>
                  </td>
                  <td className="py-2 pl-3 text-start ">
                    <p className="max-w-full truncate">{product.sold}</p>
                  </td>
                  <td className="py-2 pl-3 text-start ">
                    {Intl.NumberFormat("en-EG", {
                      style: "currency",
                      currency: product.price?.unit,
                    }).format(product.sales as number)}
                  </td>
                  <td className="py-2 pl-3 text-start relative">
                    <button
                      type="button"
                      className="options-button"
                      onClick={(ev: React.MouseEvent) =>
                        handleShowOptionsMenu(ev)
                      }
                    >
                      <i className="fi fi-sr-menu-dots text-lg leading-3 select-none pointer-events-none"></i>
                    </button>
                    <ul className="pd-table-opt-menu pd-table-opt-menu-hide">
                      <li
                        className="flex justify-start items-center gap-3 cursor-pointer py-1 px-2 w-32 border-transparent hover:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => handleShowProductDetails(product)}
                      >
                        <span className="flex justify-center items-center pointer-events-none rounded-full w-6 aspect-square shadow-inner bg-violet-200 text-violet-900">
                          <i className="fi fi-br-vector-alt text-xs"></i>
                        </span>
                        <p className="font-semibold text-gray-600 dark:text-gray-100 text-sm">
                          open
                        </p>
                      </li>
                      <li className="flex justify-start items-center gap-3 cursor-pointer py-1 px-2 w-32 border-transparent hover:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <span className="flex justify-center items-center pointer-events-none rounded-full w-6 aspect-square shadow-inner bg-violet-200 text-violet-900">
                          <i className="fi fi-br-edit leading-3 text-xs"></i>
                        </span>
                        <p className="font-semibold text-gray-600 dark:text-gray-100 text-sm">
                          edit
                        </p>
                      </li>
                      <li className="flex justify-start items-center gap-3 cursor-pointer py-1 px-2 w-32 border-transparent hover:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <span className="flex justify-center items-center pointer-events-none rounded-full w-6 aspect-square shadow-inner bg-red-200 text-red-900">
                          <i className="fi fi-br-trash text-xs"></i>
                        </span>
                        <p className="font-semibold text-gray-600 dark:text-gray-100 text-sm">
                          move sold
                        </p>
                      </li>
                    </ul>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-2 pl-3 text-start relative"></td>
              <td className="py-2 pl-3 text-start relative"></td>
              <td className="py-2 pl-3 text-start relative">
                <span className="flex items-center justify-center px-3">
                  <i className="fi fi-rr-ftp text-Xl"></i>
                </span>
              </td>
              <td className="py-2 pl-3 text-start relative">
                <p className="capitalize">sorry no data to show for now ..</p>
              </td>
              <td className="py-2 pl-3 text-start relative"></td>
              <td className="py-2 pl-3 text-start relative"></td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
  );
}

export default AllProductsTable;
