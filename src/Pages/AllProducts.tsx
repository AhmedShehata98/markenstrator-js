import React, { useLayoutEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AllProductsTable from "../components/AllProductsTable";
import AllProductsCards from "../components/AllProductsCards";
import SectionHeader from "../components/SectionHeader";
import { routesList } from "../Router/RoutesList";
import { productsDataList } from "../Utilities/dummyData";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { SET_ADD_PRODUCT_INITIAL_STATE } from "../Redux/Slice/AppSlice";

const AllProducts = () => {
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [viewMethod, setViewMethod] = useState<string>("list");

  const handleNavigateAddProductPage = () => {
    dispatch(
      SET_ADD_PRODUCT_INITIAL_STATE({
        data: {
          productName: "",
          price: {
            value: 0,
            unit: "",
          },
          sku: "",
          weight: {
            value: 0,
            unit: "",
          },
          description: "",
          media: [],
          variants: [],
          brand: "",
          category: "",
          collection: "",
        },
        displayProductDetails: false,
      })
    );
    navigate(routesList.addProducts);
  };

  const handletoggleview = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLElement;
    const iconsArr = element.children;
    const currentView = element.getAttribute("data-view") as string;
    Array.from(iconsArr).forEach((icon) => {
      if (icon.classList.contains("fi-sr-grid")) {
        icon.classList.replace("fi-sr-grid", "fi-sr-list");
        element.setAttribute("data-view", "list");
      } else {
        icon.classList.replace("fi-sr-list", "fi-sr-grid");
        element.setAttribute("data-view", "grid");
      }
    });
    setViewMethod(currentView);
  };

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
      setViewMethod("grid");
    }
  }, [documentWidth]);

  return (
    <main className="main-wrapper bg-white dark:bg-zinc-800">
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
            />
            <i className="fi fi-rr-search leading-3"></i>
          </form>
          <span
            className="grid place-content-center h-full w-9  shadow border border-violet-400 cursor-pointer"
            data-view="grid"
            onClick={(ev: React.MouseEvent) => handletoggleview(ev)}
          >
            {documentWidth <= 992 ? (
              <i className="fi fi-sr-list font-bold leading-3 text-violet-700 pointer-events-none select-none"></i>
            ) : (
              <i className="fi fi-sr-grid font-bold leading-3 text-violet-700 pointer-events-none select-none"></i>
            )}
          </span>
        </SectionHeader>
        {viewMethod === "list" ? (
          <AllProductsTable AllProductsTableData={productsDataList} />
        ) : (
          <AllProductsCards AllProductsCards={productsDataList} />
        )}
      </section>
    </main>
  );
};

export default AllProducts;
