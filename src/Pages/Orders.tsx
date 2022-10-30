import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import OrderCard from "../components/OrderCard";
import { ordersList, IOrders } from "../Utilities/dummyData";
import { DELETE_ORDER, SET_ORDER } from "../Redux/Slice/OrdersSlice";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";

const Orders = () => {
  const { ordersList, pending, success, error } = useAppSelector(
    (s) => s.orders
  );
  const dispatch = useAppDispatch();
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  const [searchMethod, setSearchMethod] = useState<keyof IOrders>("orderID");
  const [query, setQuery] = useState<string>("");

  const customSelectFunctionality = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLElement;
    const selectWrapper = element.parentElement as HTMLDivElement;
    const Label = element?.firstElementChild;
    const list = selectWrapper?.lastElementChild as HTMLUListElement;
    list?.classList.toggle("select-collapse");

    //
    Array.from(list.children).forEach((li) =>
      li.addEventListener("click", () => {
        const value = li?.getAttribute("data-value") as keyof IOrders;
        const title = li?.getAttribute("data-title") as string;
        const icon = li?.getAttribute("data-icon") as string;
        const currentIcon = Label?.firstElementChild as HTMLSpanElement;
        const currentValue = Label?.lastElementChild as HTMLSpanElement;
        //
        currentIcon.classList.replace(currentIcon?.classList[1], icon);
        currentValue.innerText = title;
        Label?.setAttribute("data-selected", value!);

        toggleSearchMethod(value, setSearchMethod);
      })
    );
    //
  };

  const toggleSearchMethod = (
    selectedValue: keyof IOrders,
    setSearchMethod: React.Dispatch<React.SetStateAction<keyof IOrders>>
  ) => {
    setSearchMethod(selectedValue);
  };

  const toSearch = (
    data: IOrders[],
    searchQuery: string,
    searchBy: keyof IOrders
  ): IOrders[] => {
    let result: IOrders[] = [];
    const filterdData: IOrders[] = data.filter((order) =>
      JSON.stringify(order[searchBy]).includes(searchQuery)
    );
    console.log(filterdData);
    filterdData.length > 0 ? result.push(...filterdData) : result.push(...data);
    return result;
  };
  const deleteOrder = (id: number): void => {
    dispatch(DELETE_ORDER({ id }));
  };
  useLayoutEffect(
    function () {
      window.addEventListener("resize", () => {
        setDocumentWidth(window.innerWidth);
      });
      return () => {
        window.removeEventListener("resize", () => {
          setDocumentWidth(window.innerWidth);
        });
      };
    },
    [window.innerWidth]
  );
  useEffect(() => {
    dispatch(SET_ORDER());
  }, []);

  return (
    <main
      className=" min-h-screen lg:ml-auto mt-14 bg-slate-200 dark:bg-zinc-700"
      style={
        documentWidth >= 1024
          ? { width: "calc(100% - 12rem)" }
          : { width: "100%" }
      }
    >
      <section className="p-3">
        <header className="w-full flex flex-col gap-2 sm:flex-row">
          <h4 className="capitalize text-xl font-semibold dark:text-zinc-100">
            orders
          </h4>
          <ul className="h-8 flex gap-3 items-center justify-end ml-auto text-gray-600 dark:text-gray-100 text-sm">
            <li className="h-full">
              <div className="custom-select">
                <button
                  type="button"
                  className="flex gap-3 items-center divide-x-2 cursor-pointer"
                  data-selected={"orderState"}
                  onClick={(ev: React.MouseEvent) =>
                    customSelectFunctionality(ev)
                  }
                >
                  <span className="flex items-center justify-center gap-2 select-none pointer-events-none">
                    <i className="fi fi-br-filter leading-3 "></i>
                    <p>search by</p>
                  </span>
                  <i className="fi fi-sr-caret-down leading-3 select-none pointer-events-none"></i>
                </button>
                <ul className="custom-select-list select-collapse">
                  <li
                    data-value={"orderState"}
                    data-title={"order state"}
                    data-icon={"fi-br-filter"}
                    className="w-full flex items-center justify-start gap-2 text-xs mx-auto mb-1 p-1 cursor-pointer hover:bg-white dark:hover:bg-zinc-700"
                  >
                    <i className="fi fi-br-filterleading-3"></i>
                    order state
                  </li>
                  <li
                    data-value={"ordersCount"}
                    data-title={"order count"}
                    data-icon={"fi-br-filter"}
                    className="w-full flex items-center justify-start gap-2 text-xs mx-auto mb-1 p-1 cursor-pointer hover:bg-white dark:hover:bg-zinc-700"
                  >
                    <i className="fi fi-br-filterleading-3"></i>
                    orders Count
                  </li>
                  <li
                    data-value={"username"}
                    data-title={"username"}
                    data-icon={"fi-br-filter"}
                    className="w-full flex items-center justify-start gap-2 text-xs mx-auto mb-1 p-1 cursor-pointer hover:bg-white dark:hover:bg-zinc-700"
                  >
                    <i className="fi fi-br-filterleading-3"></i>
                    username
                  </li>
                  <li
                    data-value={"orderID"}
                    data-title={"order id"}
                    data-icon={"fi-br-filter"}
                    className="w-full flex items-center justify-start gap-2 text-xs mx-auto mb-1 p-1 cursor-pointer hover:bg-white dark:hover:bg-zinc-700"
                  >
                    <i className="fi fi-br-filterleading-3"></i>
                    order ID
                  </li>
                  <li
                    data-value={"price"}
                    data-title={"price"}
                    data-icon={"fi-br-filter"}
                    className="w-full flex items-center justify-start gap-2 text-xs mx-auto mb-1 p-1 cursor-pointer hover:bg-white dark:hover:bg-zinc-700"
                  >
                    <i className="fi fi-br-filterleading-3"></i>
                    price
                  </li>
                </ul>
              </div>
            </li>
            <li className="h-full">
              <div className="flex items-center justify-between border border-slate-300 dark:border-slate-600 rounded h-full px-2 text-gray-500 bg-gray-50 dark:bg-zinc-800">
                <input
                  type="search"
                  className="w-full h-full outline-none bg-inherit dark:text-zinc-200"
                  placeholder="search orders ..."
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(ev.target.value)
                  }
                  value={query}
                />
                <span className="h-full flex items-center">
                  <i className="fi fi-rr-search leading-3"></i>
                </span>
              </div>
            </li>
            <li className="h-full flex items-center justify-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center w-8 rounded aspect-square border border-indigo-500  bg-gray-50 dark:text-indigo-300 dark:bg-zinc-800 dark:border-indigo-300"
              >
                <i className="fi fi-sr-rotate-right leading-3 text-indigo-700 dark:text-indigo-300"></i>
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-8 rounded aspect-square text-white border border-indigo-800 bg-indigo-700 dark:bg-indigo-400 dark:text-black dark:border-indigo-400"
              >
                <i className="fi fi-sr-download leading-3 text-white dark:text-black"></i>
              </button>
            </li>
          </ul>
        </header>
        <article>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full min-h-screen mt-7 gap-4 justify-center items-start">
            {ordersList &&
              Array.isArray(ordersList) &&
              toSearch(ordersList, query, searchMethod).map(
                (
                  {
                    id,
                    username,
                    orderDate,
                    orderID,
                    orderState,
                    ordersCount,
                    paymentMethod,
                    price,
                    userImg,
                  },
                  index
                ) => {
                  return (
                    <OrderCard
                      key={nanoid(4)}
                      ordersCount={ordersCount}
                      orderState={orderState}
                      userImg={userImg}
                      username={username}
                      orderDate={orderDate}
                      orderID={orderID}
                      paymentMethod={{
                        method: paymentMethod.method,
                        info: paymentMethod.info,
                      }}
                      price={price}
                      onClick={() => deleteOrder(id)}
                    />
                  );
                }
              )}
          </ul>
        </article>
      </section>
    </main>
  );
};

export default Orders;
