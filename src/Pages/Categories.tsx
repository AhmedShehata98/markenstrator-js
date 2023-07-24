import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { routesList } from "../Router/RoutesList";
import CategoriesList from "../features/category/components/CategoriesList";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../lib/apiMethods";
import CategoryItem from "../features/category/components/CategoryItem";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const CategoriesRef = useRef<HTMLElement | null>(null);
  let timeout: ReturnType<typeof setTimeout>;
  const { data: categoryResponse } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["categories"],
    refetchOnWindowFocus: false,
  });

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
  return (
    <main
      ref={CategoriesRef}
      className="main-wrapper section-fade-closed dark:bg-zinc-800"
    >
      <span className="sidebar-space "></span>
      <section className="content-container dark:bg-zinc-800">
        <SectionHeader
          buttonTitle="add category"
          title="categories"
          to={routesList.addCategory}
        >
          <form className="flex items-center h-full bg-zinc-100 dark:bg-zinc-700 border border-slate-300 dark:border-slate-400 rounded px-3 py-1">
            <input
              className="h-full bg-inherit border-0 rounded-sm mr-2 dark:placeholder:text-zinc-400"
              type="search"
              name="search-category"
              id="searchCategory"
              placeholder="search on categories .."
              value={searchQuery}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(ev.target.value)
              }
            />
            <i className="fi fi-rr-search leading-3 dark:text-white"></i>
          </form>
        </SectionHeader>
        <CategoriesList categories={categoryResponse?.data.categories}>
          <CategoryItem />
        </CategoriesList>
      </section>
    </main>
  );
};

export default Categories;
