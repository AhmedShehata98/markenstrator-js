import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux/ReduxHooks";
import { routesList } from "../../../Router/RoutesList";
import { Products } from "../../../../types";
import DropdownMenu from "../../../components/DropdownMenu";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import useGetProductDetails from "../../addProducts/hooks/useGetProductDetails";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import Swal, { SweetAlertResult } from "sweetalert2";
type Props = {
  product?: Products;
};

const ProductsGridItem = ({ product }: Props) => {
  const { token } = useGetToken();
  const [showDropdown, setShowDropdown] = useState(false);
  const { getProductDetails } = useGetProductDetails(product?._id);
  const { mutateAsync: mutateDeleteProductAsync, isSuccess } = useMutation({
    mutationFn: ({ id }: { id: string | undefined }) =>
      deleteProduct(id, token),
    mutationKey: ["delete-product"],
  });

  const handleToggleDropdown = useCallback(
    (open: boolean) => setShowDropdown(open),
    []
  );

  const handleEditProduct = () => getProductDetails();
  const handleRemoveProduct = (id: string | undefined) => {
    Swal.fire({
      title: "Delete Product",
      text: "are you sure , want to delete this product ?!",
      confirmButtonText: "delete",
      showCancelButton: true,
      cancelButtonText: "cancel",
    }).then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        mutateDeleteProductAsync({ id })
          .then((res) =>
            Swal.fire({
              title: "Delete Product",
              text: "Product was deleted Success .",
              icon: "success",
            })
          )
          .catch((err) => {
            Swal.fire({
              title: "Delete Product",
              text: JSON.stringify(err),
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <li
      key={product?._id}
      className="p-3 rounded-md shadow-md border border-gray-100 dark:border-gray-600"
    >
      <div className="relative flex items-center justify-start gap-2 h-16 mb-3">
        <figure className="w-16 h-16 rounded-lg overflow-hidden">
          <img
            className="max-w-full rounded-lg"
            src={
              (product?.thumbnail as Object).hasOwnProperty("url")
                ? (product?.thumbnail as any).url
                : product?.thumbnail
            }
            alt={`product-media`}
          />
        </figure>
        <span className="flex flex-col justify-start gap-1 h-full">
          <figcaption className="dark:text-white capitalize">
            {product?.name}
          </figcaption>
          <small className="text-zinc-500 dark:text-zinc-400 font-semibold">
            {Intl.NumberFormat("en-EG", {
              style: "currency",
              currency: "EGP",
            }).format(product?.price ?? 0)}
          </small>
          <ul className="flex gap-2 w-fit bg-zinc-100 dark:bg-zinc-600 p-1 mx-1 rounded-lg">
            {product?.colors?.length! > 0 &&
              product?.colors.map((colors, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: colors }}
                  className={`w-3 aspect-square inline-block rounded-full shadow-md`}
                ></li>
              ))}
          </ul>
        </span>
        <button
          type="button"
          className="grid place-content-center self-start ml-auto cursor-pointer shadow hover:bg-zinc-200 dark:hover:bg-zinc-400 px-2 py-1 border border-zinc-200 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-500 rounded-md"
          onClick={() => setShowDropdown((prev) => !prev)}
          id="dropmenu-toggler"
        >
          <i className="fi fi-br-menu-dots leading-3 pointer-events-none select-none"></i>
        </button>
        <DropdownMenu
          isToggled={showDropdown}
          togglerFn={handleToggleDropdown}
          optionsListData={[
            {
              title: "open and Edit",
              icon: <FiEdit />,
              onClick: handleEditProduct,
            },
            {
              title: "move to sold",
              icon: <IoTrashOutline />,
              onClick: () => handleRemoveProduct(product?._id),
            },
          ]}
        />
      </div>
      <br />
      <div className="mb-3">
        <h6 className="font-semibold capitalize">summury</h6>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
          {product?.description}
        </p>
      </div>
      <ul className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg divide-y divide-zinc-300 dark:divide-zinc-500 border border-zinc-300 dark:border-zinc-500">
        <li className="w-full flex justify-between items-center p-1 dark:text-white uppercase">
          <p className="font-semibold text-sm">sales</p>
          <small>
            {Intl.NumberFormat("en-EG", {
              style: "percent",
              signDisplay: "exceptZero",
            }).format((product as any)?.sales ?? 0)}
          </small>
        </li>
        <li className="w-full flex justify-between items-center p-1 dark:text-white uppercase">
          <p className="font-semibold text-sm">changes</p>
          {Intl.NumberFormat("en-EG", {
            style: "currency",
            currency: "EGP",
          }).format((product as any)?.changes ?? 0)}
        </li>
        <li className="w-full flex justify-between items-center p-1 dark:text-white uppercase">
          <p className="font-semibold text-sm">sold</p>
          {Intl.NumberFormat("en-EG", {
            style: "currency",
            currency: "EGP",
          }).format((product as any)?.sold ?? 0)}
        </li>
      </ul>
    </li>
  );
};

export default ProductsGridItem;
