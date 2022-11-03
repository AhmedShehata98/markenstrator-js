import React from "react";
import { ICategoryData } from "../Types/pages-types";

type CartegoriesCardsProps = {
  categoriesData: ICategoryData[];
};
const CartegoriesCards = ({ categoriesData }: CartegoriesCardsProps) => {
  return (
    <article className="w-full flex items-start justify-start my-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {Array.isArray(categoriesData) &&
          categoriesData &&
          categoriesData.map((category) => {
            return (
                <span className="flex items-center first:text-emerald-500 dark:first:text-emerald-300 first:text-3xl mb-2">
                  <i
                    className={`${category.icon} leading-3 pointer-events-none`}
                  />
                </span>
                <p className="font-semibold capitalize dark:text-white">
                  {category["category-name"]}
                </p>
                <small className="capitalize text-zinc-600 dark:text-zinc-400">
                  {category["category-products-count"]}
                </small>
              </li>
            );
          })}
      </ul>
    </article>
  );
};

export default CartegoriesCards;
