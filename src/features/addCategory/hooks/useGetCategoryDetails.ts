import React from "react";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../Router/RoutesList";
import { Id } from "../../../../types";

function useGetCategoryDetails() {
  const { addCategory } = routesList;
  const navigator = useNavigate();
  const getCategoryDetails = (id: Id) =>
    navigator(addCategory, { state: { id: id, updateCategory: true } });
  return { getCategoryDetails };
}

export default useGetCategoryDetails;
