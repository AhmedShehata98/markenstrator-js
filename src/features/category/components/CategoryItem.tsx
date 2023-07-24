import React from "react";
import { Categories } from "../../../../types";
import { BiEdit } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../Router/RoutesList";

type Props = {
  category?: Categories;
};
function CategoryItem({ category }: Props) {
  const { token } = useGetToken();
  const { invalidateQueries } = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => deleteCategory(id, token),
    mutationKey: ["delete-category"],
  });
  const handleDelete = (id: string | undefined) => {
    Swal.fire({
      title: "Remove category",
      text: "Are you sure , want to delete this category item ? ",
      cancelButtonText: "cancel",
      confirmButtonText: "delete",
      showCancelButton: true,
    }).then((res: SweetAlertResult) => {
      if (res.isConfirmed)
        mutate(id, {
          onSuccess: () =>
            invalidateQueries({
              queryKey: ["categories"],
              exact: true,
              refetchType: "all",
            }),
        });
    });
  };

  const handleEdit = (id: string | undefined) => {
    navigate(routesList.addCategory, { state: { id, updateCategory: true } });
  };

  return (
    <li className="category-card">
      <div className="flex items-center justify-center gap-4">
        <figure className="w-24">
          <img
            src={category?.image}
            alt="img-prev"
            className="w-full object-cover object-center"
          />
        </figure>
        <div>
          <h3 className="font-semibold uppercase">{category?.name}</h3>
          <p className="text-sm text-gray-600">{category?.description}</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <button
          onClick={() => handleEdit(category?._id)}
          className="max-md:w-full w-1/2 flex items-center justify-center bg-gray-400 py-2 rounded hover:bg-gray-300"
        >
          <BiEdit />
        </button>
        <button
          onClick={() => handleDelete(category?._id)}
          className="max-md:w-full w-1/2 flex items-center justify-center bg-red-400 py-2 rounded hover:bg-red-300"
        >
          <IoTrashOutline />
        </button>
      </div>
    </li>
  );
}

export default CategoryItem;
