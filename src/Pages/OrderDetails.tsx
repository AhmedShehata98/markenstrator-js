import React, { useEffect, useRef } from "react";
import InputGroup from "../components/InputGroup";
import { useLocation, useNavigation, useParams } from "react-router-dom";
import useGetToken from "../Hooks/useGetToken";
import { useQuery } from "@tanstack/react-query";
import { getAddressById, getOrdersById } from "../lib/apiMethods";
import OrderDetailsWrapper from "../features/orders/OrderDetailsWrapper";
import OrderProductsWrapper from "../features/orders/OrderProductsWrapper";
import OrderProductCard from "../features/orders/OrderProductCard";
import OrderAddressWrapper from "../features/orders/OrderAddressWrapper";
import AddressCard from "../features/orders/AddressCard";

function OrderDetails() {
  const orderDetailssRef = useRef<HTMLElement | null>(null);
  const { state, pathname } = useLocation();

  const { token } = useGetToken();
  const {
    data: orderResponse,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["order-details", state?.order],
    queryFn: () => getOrdersById({ id: state?.order, token }),
    enabled: Boolean(state) && Boolean(token),
  });

  useEffect(() => {
    window.document.title = pathname
      .split("/")
      [pathname.split("/").length - 1].split("-")
      .join(" ")
      .toLocaleUpperCase();
  }, []);

  let timeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    timeout = setTimeout(() => {
      orderDetailssRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    }, 5);
    return () => {
      clearTimeout(timeout);
      orderDetailssRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    };
  }, []);
  return (
    <main
      ref={orderDetailssRef}
      className="main-wrapper section-fade-closed bg-slate-100 dark:bg-zinc-700"
    >
      <span className="sidebar-space"></span>
      <section className="content-container">
        <h3 className="mt-3 mb-5 text-xl text-gray-700 uppercase">
          order owner informations :
        </h3>
        <OrderDetailsWrapper
          order={orderResponse?.data!}
          apiCallState={{ isError, isLoading, isSuccess }}
        />
        <OrderProductsWrapper
          products={{ products: orderResponse?.data.products! }}
          apiCallState={{ isError, isLoading, isSuccess }}
        >
          <OrderProductCard />
        </OrderProductsWrapper>
        <OrderAddressWrapper
          addressData={orderResponse?.data.addressId}
          apiCallState={{ isError, isLoading, isSuccess }}
          fullname={orderResponse?.data.userId.fullname}
        >
          <AddressCard />
        </OrderAddressWrapper>
      </section>
    </main>
  );
}

export default OrderDetails;
