import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { routesList } from "../Router/RoutesList";
import CategoriesList from "../features/category/components/CategoriesList";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../lib/apiMethods";
import CategoryItem from "../features/category/components/CategoryItem";
import { useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const CategoriesRef = useRef<HTMLElement | null>(null);
  const navigator = useNavigate();
  let timeout: ReturnType<typeof setTimeout>;
  const {
    data: categoryResponse,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["categories"],
    refetchOnWindowFocus: false,
  });

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
      CategoriesRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    }, 5);
    return () => {
      clearTimeout(timeout);
      CategoriesRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    };
  }, []);

  const handleNavigateToAddCategory = () => {
    navigator(routesList.addCategory, { state: { updateCategory: false } });
  };

  return (
    <section
      ref={CategoriesRef}
      className="content-container section-fade-closed"
    >
      <SectionHeader
        buttonTitle="add category"
        title="categories"
        onClick={handleNavigateToAddCategory}
      >
        <form className="w-full flex items-center justify-center min-w-fit rounded border dark:border-slate-600 bg-white dark:bg-zinc-700 dark:text-white py-2 px-3">
          <input
            className="w-full bg-inherit outline-none border-0 h-5 mr-3 rounded focus:!border-slate-400"
            type="search"
            name="search-product"
            id="search-product"
            placeholder="search product .."
          />
          <i className="fi fi-rr-search leading-3"></i>
        </form>
      </SectionHeader>
      <CategoriesList
        categories={categoryResponse?.data.categories}
        apiCallState={{ isLoading, isSuccess }}
      >
        <CategoryItem />
      </CategoriesList>
    </section>
  );
};

export default Categories;
