import React from "react";
import { Products } from "../../../../types";
import { routesList } from "../../../Router/RoutesList";
import { useNavigate } from "react-router-dom";

type Props = {
  product?: Products;
};
function ProductTableItem({ product }: Props) {
  const navigate = useNavigate();
  const handleShowProductDetails = (id: string | undefined) => {
    navigate(routesList.addProducts, { state: id });
  };

  const handleShowOptionsMenu = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLElement;
    const tRow = element.closest("td") as HTMLTableDataCellElement;
    const optionMenu = tRow.children[1];
    optionMenu.classList.toggle("pd-table-opt-menu-hide");
  };
  return (
    <tr key={product?._id} className="product-table-item">
      <td className="py-2 pl-3 text-start ">
        <p className="max-w-full truncate">{product?.sku}</p>
      </td>
      <td className="py-2 pl-3 text-start flex gap-3">
        <span
          className="flex items-center gap-2 justify-center cursor-pointer"
          onClick={() => handleShowProductDetails(product?._id)}
        >
          <figure className="w-14 rounded-full aspect-square overflow-hidden shadow border-2 m-0">
            <img
              className="w-full object-cover rounded-full"
              src={
                (product?.thumbnail as Object).hasOwnProperty("url")
                  ? (product?.thumbnail as any).url
                  : product?.thumbnail
              }
              alt={`product-media`}
            />
          </figure>
          <figcaption className="max-w-xs grid place-items-start place-content-center text-sm font-bold capitalize text-gray-700 dark:text-gray-300 overflow-hidden truncate">
            {product?.name ?? "NA-NA"}
          </figcaption>
        </span>
      </td>
      <td className="py-2 pl-3 text-start ">
        <p className="bg-gray-300 dark:bg-gray-300 dark:text-black text-center font-medium rounded-full px-3 py-2 max-w-full truncate uppercase">
          {product?.category_id?.name ?? "NA-NA"}
        </p>
      </td>
      <td>
        <p className=" dark:text-white  text-center rounded-full px-3 py-[2px] max-w-full truncate">
          {Intl.NumberFormat("en-EG", {
            style: "percent",
            signDisplay: "exceptZero",
          }).format(+0)}
        </p>
      </td>
      <td className="py-2 pl-3 text-start ">
        <p className="max-w-full truncate">
          {Intl.NumberFormat("en-EG", {
            style: "currency",
            currency: "EGP",
          }).format(product?.price ?? 0)}
        </p>
      </td>
      <td className="py-2 pl-3 text-start ">
        <p className="max-w-full truncate">
          {(product as any)?.sold ?? "NA-NA"}
        </p>
      </td>
      <td className="py-2 pl-3 text-start ">
        {Intl.NumberFormat("en-EG", {
          style: "currency",
          currency: "EGP",
        }).format((product as any)?.sales ?? 0)}
      </td>
      <td className="py-2 pl-3 text-start relative">
        <button
          type="button"
          className="options-button"
          onClick={(ev: React.MouseEvent) => handleShowOptionsMenu(ev)}
        >
          <i className="fi fi-sr-menu-dots text-lg leading-3 select-none pointer-events-none"></i>
        </button>
        <ul className="pd-table-opt-menu pd-table-opt-menu-hide">
          <li
            className="flex justify-start items-center gap-3 cursor-pointer py-1 px-2 border-transparent hover:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleShowProductDetails(product?._id)}
          >
            <span className="flex justify-center items-center pointer-events-none rounded-full w-6 aspect-square shadow-inner bg-violet-200 text-violet-900">
              <i className="fi fi-br-vector-alt text-xs"></i>
            </span>
            <p className="font-semibold text-gray-600 dark:text-gray-100 text-sm">
              open & edit
            </p>
          </li>

          <li className="flex justify-start items-center gap-3 cursor-pointer py-1 px-2 w-32 border-transparent hover:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            <span className="flex justify-center items-center pointer-events-none rounded-full w-6 aspect-square shadow-inner bg-red-200 text-red-900">
              <i className="fi fi-br-trash text-xs"></i>
            </span>
            <p className="font-semibold text-gray-600 dark:text-gray-100 text-sm">
              move sold
            </p>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default ProductTableItem;
