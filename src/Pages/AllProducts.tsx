import React, { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AllProductsTable from "../components/AllProductsTable";
import SectionHeader from "../components/SectionHeader";
import { routesList } from "../Router/RoutesList";
import { productsDataList } from "../Utilities/dummyData";

const AllProducts = () => {
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setDocumentWidth(window.innerWidth);
    });
    return () =>
      removeEventListener("resize", () => {
        setDocumentWidth(window.innerWidth);
      });
  }, [window.innerWidth]);

  return (
    <main className="section-main bg-white dark:bg-zinc-800">
      <section
        style={
          documentWidth >= 1024
            ? { width: "calc(100% - 12rem)" }
            : { width: "100%" }
        }
      >
        <SectionHeader
          title="all products"
          buttonTitle="add Products"
          to={routesList.addProducts}
        >
          <input
            className="bg-inherit outline-none py-0 border-0 mr-3 rounded focus:!border-slate-400"
            type="search"
            name="search-product"
            id="search-product"
            placeholder="search product .."
          />
          <span className="flex items-center justify-center">
            <i className="fi fi-rr-search leading-3"></i>
          </span>
        </SectionHeader>
        <AllProductsTable AllProductsTableData={productsDataList} />
      </section>
    </main>
  );
};

export default AllProducts;
