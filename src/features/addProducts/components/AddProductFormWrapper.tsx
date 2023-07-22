import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProduct,
  getProductById,
  uploadProductImage,
} from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import { Products, UploadProductImageResponse } from "../../../../types";
import Swal from "sweetalert2";
import { ImSpinner8 } from "react-icons/im";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode[];
};

function AddProductFormWrapper({ children }: Props) {
  const { token } = useGetToken();

  const { mutateAsync, isLoading: isLoadingMedia } = useMutation({
    mutationFn: (media: FormData) => uploadProductImage(media!, token!),
    mutationKey: ["media"],
  });
  const { mutate, isLoading: isLoadingProduct } = useMutation({
    mutationFn: (productData: Partial<Products>) =>
      addProduct(productData, token),
    mutationKey: ["create-product"],
  });
  const { state: ProductId } = useLocation();
  const {
    data: product,
    isLoading: isLoadingProdById,
    isSuccess: isSuccessProdById,
  } = useQuery({
    queryFn: () => getProductById(ProductId),
    queryKey: ["product", ProductId],
  });

  const uploadProductImages = async (
    filesList: FormDataEntryValue[]
  ): Promise<UploadProductImageResponse> => {
    const formdata = new FormData();
    Array.from(filesList).forEach((file) =>
      formdata.append("product-image", file)
    );
    return await mutateAsync(formdata);
  };

  const getFormFields = (
    ev: React.FormEvent<HTMLFormElement>
  ): { formProductData: FormData; objectData: Partial<Products> } => {
    const formProductData = new FormData(ev.currentTarget);
    const name = formProductData.get("name")?.toString(),
      price = Number(formProductData.get("price")),
      sku = formProductData.get("sku")?.toString(),
      stock = Number(formProductData.get("stock")),
      categoryId = formProductData.get("category_id")?.toString(),
      discount = Number(formProductData.get("discount")),
      description = formProductData.get("description")?.toString(),
      specifications = formProductData.get("specifications")?.toString(),
      deliveryCost = Number(formProductData.get("deliveryCost")),
      brand = formProductData.get("brand")?.toString(),
      colors = formProductData.getAll("colors") as Array<string>;
    const objectData = {
      name,
      price,
      sku,
      stock,
      category_id: categoryId,
      discount,
      description,
      specifications,
      deliveryCost: deliveryCost!,
      brand,
      colors,
    };

    return { formProductData, objectData };
  };

  const setFormFields = (product: Partial<Products>) => {
    // fd.set("name", product.name!);
    // fd.set("price", product.price?.toString()!);
    // fd.set("sku", product.sku!);
    // fd.set("stock", product.stock?.toString()!);
    // fd.set("category_id", product.category_id?.name!);
    // fd.set("discount", product.discount?.toString()!);
    // fd.set("description", product.description!);
    // fd.set("specifications", product.specifications!);
    // fd.set("brand", product.brand!);
    // fd.set("colors", product.colors!);
    // fd.set("images", product.images!);
    // fd.set("thumbnail", product.thumbnail!);
  };

  const sendFullProductData = (productData: Partial<Products>): void => {
    mutate(productData, {
      onError(error) {
        Swal.fire({
          title: "add product",
          text:
            (error as any).message.split(".").join("\n") ??
            "error encorrect data",
          icon: "error",
          confirmButtonText: "close",
        });
      },
      onSuccess(data) {
        Swal.fire({
          title: "add product",
          text: data.message,
          icon: "success",
          confirmButtonText: "Okay",
        });
      },
    });
  };
  const handleSubmitProductData = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { formProductData, objectData } = getFormFields(ev);

    const imagesList = formProductData.getAll("images");
    uploadProductImages(imagesList).then(({ data }) => {
      const newObjectData: Partial<Products> = {
        ...objectData,
        images: data.images as [],
        thumbnail: data.images[0].url,
      };
      sendFullProductData(newObjectData);
    });
  };

  useEffect(() => {
    if (isSuccessProdById && !isLoadingProdById) {
      setFormFields(product.data.product);
    }
  }, [isLoadingProdById, isSuccessProdById, product]);

  return (
    <form
      action=""
      className="w-full flex flex-row gap-x-12 flex-wrap"
      onSubmit={(ev) => {
        handleSubmitProductData(ev);
      }}
    >
      {children}
      <button
        type="submit"
        className="submit-btn w-1/4 ml-auto"
        disabled={isLoadingProduct || isLoadingMedia}
      >
        {!isLoadingProduct && !isLoadingMedia && <p>add product</p>}
        {isLoadingProduct ||
          (isLoadingMedia && (
            <ImSpinner8 className="inline-block text-lg animate-spin" />
          ))}
      </button>
    </form>
  );
}

export default AddProductFormWrapper;
