import React from "react";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../Router/RoutesList";

function useGetProductDetails(id: string | undefined) {
  const navigator = useNavigate();
  const { addProducts } = routesList;
  const getProductDetails = () => {
    navigator(addProducts, { state: { isUpdateProduct: true, id } });
  };

  return { getProductDetails };
}

export default useGetProductDetails;
