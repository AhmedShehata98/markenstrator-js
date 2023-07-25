import React from "react";
import { Categories } from "../../../../types";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  categories: Categories[] | undefined;
  apiCallState: { isLoading: boolean; isSuccess: boolean };
};
function CategoriesList({
  children,
  categories,
  apiCallState: { isLoading, isSuccess },
}: Props) {
  const renderChildrenElements = (category: Categories) =>
    React.Children.map(children as any, (child: React.ReactElement) =>
      React.cloneElement(child, {
        key: category._id,
        category,
      })
    );
  return (
    <ul className="category-list">
      {isSuccess &&
        !isLoading &&
        categories?.map((category) => renderChildrenElements(category))}
      {isLoading && (
        <span>
          <ImSpinner8 className="inline-block text-xl animate-spin" />
          <p>processing ...</p>
        </span>
      )}
    </ul>
  );
}

export default CategoriesList;
