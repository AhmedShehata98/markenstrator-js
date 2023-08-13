import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import OrderCard from "../features/orders/OrderCard";
import SectionHeader from "../components/SectionHeader";
import { getOrders } from "../lib/apiMethods";
import useGetToken from "../Hooks/useGetToken";
import OrdersListWrapper from "../features/orders/OrdersListWrapper";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import PaginationWrapper from "../components/pagginition/PaginationWrapper";
import PaginationBtn from "../components/pagginition/PaginationBtn";
import { FiRefreshCw } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import OrderFilterSelect from "../features/orders/OrderFilterSelect";
import { Order, OrderStatus } from "../../types";
import useDebounceValue from "../Hooks/useDebounceValue";

const Orders = () => {
  const ordersRef = useRef<HTMLElement | null>(null);
  const [page, setPage] = useState(1);
  const { token } = useGetToken();
  const {
    data: ordersResponse,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders({ token, limit: 8, page }),
    enabled: Boolean(token),
  });
  const { pathname } = useLocation();
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState<string>("");
  const { debouncedValue } = useDebounceValue(query, 500);
  const filterdOrdersList = useCallback(
    (dataToFilter: Order[] | undefined) => {
      if (orderFilter === "all") return dataToFilter;
      if (query === "") return dataToFilter;

      const orders = dataToFilter?.filter(
        (order) =>
          order.status === orderFilter &&
          order.userId.fullname
            .toLowerCase()
            .startsWith(query.trim().toLowerCase())
      );
      return orders;
    },
    [orderFilter, debouncedValue]
  );

  let timeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    window.document.title = pathname
      .split("/")
      [pathname.split("/").length - 1].split("-")
      .join(" ")
      .toLocaleUpperCase();
  }, []);
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

  const handleChangePage = (pageNo: string | undefined) => {
    if (pageNo) {
      setPage(+pageNo);
    }
  };

  const handleSetFilter = (ev: React.ChangeEvent) => {
    const filter = (ev.target as HTMLSelectElement).value;
    setOrderFilter(filter as OrderStatus);
  };

  return (
    <section ref={ordersRef} className="content-container section-fade-closed">
      <SectionHeader title="orders list" buttonTitle="soon ..." to="#">
        <OrderFilterSelect onChangeFilter={handleSetFilter} />
        <div className="flex items-center justify-between gap-3 bg-inherit dark:border-slate-600 rounded h-full px-2 text-gray-500 ">
          <form className="w-full flex items-center justify-center min-w-fit rounded border dark:border-slate-600 bg-white dark:bg-zinc-700 dark:text-white py-2 px-3">
            <input
              className="w-full bg-inherit outline-none border-0 h-5 mr-3 rounded focus:!border-slate-400"
              type="search"
              name="search-product"
              id="search-product"
              placeholder="search orders ..."
              value={query}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                setQuery(ev.target.value);
                // setOrderFilter("all");
              }}
            />
            <i className="fi fi-rr-search leading-3"></i>
          </form>
          <button
            type="button"
            className="flex items-center justify-center w-8 rounded-sm aspect-square border border-slate-300  bg-violet-100 dark:text-indigo-400 dark:bg-zinc-800 dark:border-indigo-300 disabled:!bg-gray-200 disabled:!text-gray-500"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {!isLoading && (
              <FiRefreshCw className="fi fi-sr-rotate-right leading-3 text-violet-700 dark:text-indigo-300" />
            )}
            {isLoading && (
              <BiTimeFive className="fi fi-sr-rotate-right leading-3 text-orange-400 dark:text-indigo-300" />
            )}
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-8 rounded-sm aspect-square text-white border border-violet-800 bg-violet-700 dark:bg-violet-400 dark:text-black dark:border-violet-400"
          >
            <i className="fi fi-sr-download leading-3 text-white dark:text-black"></i>
          </button>
        </div>
      </SectionHeader>
      <OrdersListWrapper
        orders={filterdOrdersList(ordersResponse?.data.orders)!}
        apiCallState={{ isSuccess, isError, isLoading }}
      >
        <OrderCard />
      </OrdersListWrapper>
      <PaginationWrapper
        onClickToChangePage={(ev) =>
          handleChangePage((ev.target as HTMLButtonElement).dataset.pageno)
        }
        actualOrdersLength={ordersResponse?.data.pagination.actualOrdersLength}
        currentPage={ordersResponse?.data.pagination.currentPage}
        length={ordersResponse?.data.pagination.length}
        limit={ordersResponse?.data.pagination.limit}
        remainingPages={ordersResponse?.data.pagination.remainingPages}
      >
        <PaginationBtn />
      </PaginationWrapper>
    </section>
  );
};

export default Orders;
