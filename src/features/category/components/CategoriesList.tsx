import React from "react";
import { Categories } from "../../../../types";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  categories: Categories[] | undefined;
};
function CategoriesList(props: Props) {
  const renderChildrenElements = (category: Categories) =>
    React.Children.map(props.children as any, (child: React.ReactElement) =>
      React.cloneElement(child, {
        key: category._id,
        category,
      })
    );
  return (
    <ul className="category-list">
      {props.categories?.map((category) => renderChildrenElements(category))}
    </ul>
  );
}

export default CategoriesList;
