import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsTableList from "../features/products/components/ProductsTableList";
import ProductsGridItem from "../features/products/components/ProductsGridItem";
import SectionHeader from "../components/SectionHeader";
import { routesList } from "../Router/RoutesList";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../lib/apiMethods";
import ProductTableItem from "../features/addProducts/components/ProductTableItem";
import ProductsGridList from "../features/products/components/ProductsGridList";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import PaginationWrapper from "../components/pagginition/PaginationWrapper";
import PaginationBtn from "../components/pagginition/PaginationBtn";
import useDebounceValue from "../Hooks/useDebounceValue";

const AllProducts = () => {
  const navigate = useNavigate();
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { debouncedValue: debouncedSearchTerm } = useDebounceValue(
    searchTerm,
    500
  );
  const [viewMethod, setViewMethod] = useState<"grid" | "list">("grid");
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useQuery(["all-products", debouncedSearchTerm, page], () =>
    getAllProducts({
      limit: 8,
      page,
      parts: "pagination",
      q: debouncedSearchTerm ?? undefined,
    })
  );

  const handleNavigateAddProductPage = () => {
    navigate(routesList.addProducts);
  };

  const handletoggleview = () => {
    setViewMethod((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const AllProductsRef = useRef<HTMLElement | null>(null);
  let timeout: ReturnType<typeof setTimeout>;

  const { pathname } = useLocation();

  useEffect(() => {
    window.document.title = pathname
      .split("/")
      [pathname.split("/").length - 1].split("-")
      .join(" ")
      .toLocaleUpperCase();
  }, []);
  useEffect(() => {
    timeout = setTimeout(() => {
      AllProductsRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    }, 5);
    return () => {
      clearTimeout(timeout);
      AllProductsRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    };
  }, []);
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setDocumentWidth(window.innerWidth);
    });
    return () =>
      removeEventListener("resize", () => {
        setDocumentWidth(window.innerWidth);
      });
  }, [window.innerWidth]);

  useLayoutEffect(() => {
    if (documentWidth <= 992) {
      setViewMethod("list");
    }
  }, [documentWidth]);

  return (
    <main
      ref={AllProductsRef}
      className="main-wrapper section-fade-closed bg-white dark:bg-zinc-800"
    >
      <span className="sidebar-space"></span>
      <section className="content-container">
        <SectionHeader
          title="all products"
          buttonTitle="add Products"
          to={routesList.addProducts}
          onClick={() => handleNavigateAddProductPage()}
        >
          <form className="flex items-center justify-center min-w-fit rounded border dark:border-slate-600 bg-gray-100 dark:bg-zinc-700 dark:text-white py-1 px-3">
            <input
              className="bg-inherit outline-none border-0 h-5 mr-3 rounded focus:!border-slate-400"
              type="search"
              name="search-product"
              id="search-product"
              placeholder="search product .."
              value={searchTerm}
              onChange={(ev) => setSearchTerm(ev.target.value)}
            />
            <i className="fi fi-rr-search leading-3"></i>
          </form>
          <span
            className="grid place-content-center h-full w-9  shadow border border-violet-400 cursor-pointer"
            data-view="grid"
            onClick={() => handletoggleview()}
          >
            {viewMethod === "grid" && (
              <BsGrid3X3GapFill className="text-xl text-violet-700 pointer-events-none select-none" />
            )}
            {viewMethod === "list" && (
              <FaList className="text-xl text-violet-700 pointer-events-none select-none" />
            )}
          </span>
        </SectionHeader>

        <ProductsTableList
          productsData={products?.data.products ?? []}
          apiCallState={{ isLoading, isSuccess }}
          productsView={viewMethod}
        >
          <ProductTableItem />
        </ProductsTableList>
        <ProductsGridList
          productsData={products?.data.products ?? []}
          apiCallState={{ isLoading, isSuccess }}
          productsView={viewMethod}
        >
          <ProductsGridItem />
        </ProductsGridList>
        <div className="w-full my-6 border"></div>
        <PaginationWrapper
          onClickToChangePage={(ev) => {
            const pageNo = (ev.target as HTMLButtonElement).dataset.pageno;
            if (pageNo) setPage(+pageNo);
          }}
          actualOrdersLength={products?.data.pagination.actualProductsLength}
          currentPage={products?.data.pagination.currentPage}
          length={products?.data.pagination.length}
          limit={products?.data.pagination.limit}
          remainingPages={products?.data.pagination.remainingPages}
        >
          <PaginationBtn />
        </PaginationWrapper>
      </section>
    </main>
  );
};

export default AllProducts;
