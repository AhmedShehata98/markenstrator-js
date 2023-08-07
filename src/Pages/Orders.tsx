import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import OrderCard from "../features/orders/OrderCard";
import { ordersList, IOrders } from "../Utilities/dummyData";
import { DELETE_ORDER, SET_ORDER } from "../Redux/Slice/OrdersSlice";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import SectionHeader from "../components/SectionHeader";
import { Dropdown } from "flowbite-react";
import { getOrders } from "../lib/apiMethods";
import useGetToken from "../Hooks/useGetToken";
import OrdersListWrapper from "../features/orders/OrdersListWrapper";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const { ordersList, pending, success, error } = useAppSelector(
    (s) => s.orders
  );
  const { token } = useGetToken();
  const {
    data: ordersResponse,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders({ token, limit: 8, page: 1 }),
    enabled: Boolean(token),
  });
  const dispatch = useAppDispatch();
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  const [searchMethod, setSearchMethod] =
    useState<keyof IOrders>("ordersCount");
  const [query, setQuery] = useState<string>("");

  const handleSelectSearchMethod = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchMethod(ev.target.value as keyof IOrders);

  const ordersRef = useRef<HTMLElement | null>(null);
  let timeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    timeout = setTimeout(() => {
      ordersRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    }, 5);
    return () => {
      clearTimeout(timeout);
      ordersRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    };
  }, []);
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

  return (
    <main
      ref={ordersRef}
      className="main-wrapper section-fade-closed bg-slate-100 dark:bg-zinc-700"
    >
      <span className="sidebar-space"></span>
      <section className="content-container">
        <SectionHeader title="orders list" buttonTitle="soon ..." to="#">
          <select
            value={searchMethod}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
              handleSelectSearchMethod(ev)
            }
          >
            <option value="orderState">order status</option>
            <option value="username">username</option>
            <option value="price">price</option>
            <option value="ordersCount">order</option>
          </select>
          <div className="flex items-center justify-between gap-3 bg-inherit dark:border-slate-600 rounded h-full px-2 text-gray-500 ">
            <form className="flex items-center h-full bg-zinc-100 dark:bg-zinc-700 border border-slate-300 dark:border-slate-400 rounded px-3 py-1">
              <input
                className="h-full bg-inherit border-0 rounded-sm mr-2 dark:placeholder:text-zinc-400"
                type="search"
                name="search-order"
                id="searchOrder"
                placeholder="search orders ..."
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(ev.target.value)
                }
                value={query}
              />
              <i className="fi fi-rr-search leading-3 dark:text-white"></i>
            </form>
            <button
              type="button"
              className="flex items-center justify-center w-8 rounded-sm aspect-square border border-slate-300  bg-violet-100 dark:text-indigo-400 dark:bg-zinc-800 dark:border-indigo-300"
            >
              <i className="fi fi-sr-rotate-right leading-3 text-violet-700 dark:text-indigo-300"></i>
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-8 rounded-sm aspect-square text-white border border-violet-800 bg-violet-700 dark:bg-violet-400 dark:text-black dark:border-violet-400"
            >
              <i className="fi fi-sr-download leading-3 text-white dark:text-black"></i>
            </button>
          </div>
        </SectionHeader>
        <article className="w-full">
          <OrdersListWrapper
            orders={ordersResponse?.data.orders!}
            apiCallState={{ isSuccess, isError, isLoading }}
          >
            <OrderCard />
          </OrdersListWrapper>
          {/* <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full min-h-screen mt-7 gap-4 justify-center items-start">
            {ordersList &&
              Array.isArray(ordersList) &&
              ordersList
                .filter((order) =>
                  order[searchMethod].toString().includes(query)
                )
                .map(
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
          </ul> */}
        </article>
      </section>
    </main>
  );
};

export default Orders;
