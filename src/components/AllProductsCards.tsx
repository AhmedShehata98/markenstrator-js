import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { SET_ADD_PRODUCT_INITIAL_STATE } from "../Redux/Slice/AppSlice";
import { routesList } from "../Router/RoutesList";
import { Products } from "../../types";

type AllProductsCardsProps = {
  AllProductsCards: Products[];
};

const AllProductsCards = ({ AllProductsCards }: AllProductsCardsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleShowOptionsMenu = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLElement;
    const tRow = element.closest("button") as HTMLButtonElement;
    const optionMenu = tRow.children[1];
    optionMenu.classList.toggle("pd-table-opt-menu-hide");
  };
  const handleShowProductDetails = (productDetails: Products) => {
    navigate(routesList.addProducts, { state: productDetails._id });
  };

  return (
    <article className="min-w-full min-h-fit ">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {AllProductsCards &&
          Array.isArray(AllProductsCards) &&
          AllProductsCards.map((product, index) => {
            return (
              <li
                key={nanoid(4)}
                className="p-3 shadow rounded-md border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-start gap-2 h-16 mb-3">
                  <figure className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      className="max-w-full rounded-lg"
                      src={
                        (product.thumbnail as Object).hasOwnProperty("url")
                          ? (product.thumbnail as any).url
                          : product.thumbnail
                      }
                      alt={`$product-media-#${index + 1}`}
                    />
                  </figure>
                  <span className="flex flex-col justify-start gap-1 h-full">
                    <figcaption className="dark:text-white capitalize">
                      {product.name}
                    </figcaption>
                    <small className="text-zinc-500 dark:text-zinc-400 font-semibold">
                      {Intl.NumberFormat("en-EG", {
                        style: "currency",
                        currency: "EGP",
                      }).format(+product.price)}
                    </small>
                    <ul className="flex gap-2 w-fit bg-zinc-100 dark:bg-zinc-600 p-1 mx-1 rounded-lg">
                      {product.colors.length > 0 &&
                        product.colors.map((colors) => (
                          <li
                            key={colors}
                            style={{ backgroundColor: colors }}
                            className={`w-3 aspect-square inline-block rounded-full shadow-md`}
                          ></li>
                        ))}
                    </ul>
                  </span>
                  <button
                    type="button"
                    className="relative grid place-content-center self-start ml-auto cursor-pointer shadow hover:bg-zinc-200 dark:hover:bg-zinc-400 px-2 py-1 border border-zinc-200 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-500 rounded-md"
                    onClick={(ev: React.MouseEvent) =>
                      handleShowOptionsMenu(ev)
                    }
                  >
                    <i className="fi fi-br-menu-dots leading-3 pointer-events-none select-none"></i>
                    <ul className="pd-card-opt-menu pd-table-opt-menu-hide">
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
                  </button>
                </div>
                <br />
                <div className="mb-3">
                  <h6 className="font-semibold capitalize">summury</h6>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {product.description}
                  </p>
                </div>
                <ul className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg divide-y divide-zinc-300 dark:divide-zinc-500 border border-zinc-300 dark:border-zinc-500">
                  <li className="w-full flex justify-between items-center p-1 dark:text-white uppercase">
                    <p className="font-semibold text-sm">sales</p>
                    <small>
                      {Intl.NumberFormat("en-EG", {
                        style: "percent",
                        signDisplay: "exceptZero",
                      }).format((product as any).sales ?? 0)}
                    </small>
                  </li>
                  <li className="w-full flex justify-between items-center p-1 dark:text-white uppercase">
                    <p className="font-semibold text-sm">changes</p>
                    {Intl.NumberFormat("en-EG", {
                      style: "currency",
                      currency: "EGP",
                    }).format((product as any).changes ?? 0)}
                  </li>
                  <li className="w-full flex justify-between items-center p-1 dark:text-white uppercase">
                    <p className="font-semibold text-sm">sold</p>
                    {Intl.NumberFormat("en-EG", {
                      style: "currency",
                      currency: "EGP",
                    }).format((product as any).sold ?? 0)}
                  </li>
                </ul>
              </li>
            );
          })}
      </ul>
    </article>
  );
};

export default AllProductsCards;
