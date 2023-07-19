import { useMutation } from "@tanstack/react-query";
import { addProduct, uploadProductImage } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import { Products, UploadProductImageResponse } from "../../../../types";
import Swal from "sweetalert2";
import { ImSpinner8 } from "react-icons/im";
import { useLocation } from "react-router-dom";

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
        images: data.images,
        thumbnail: data.images[0].url,
      };
      sendFullProductData(newObjectData);
    });
  };

  return (
    <form
      action=""
      className="w-full flex flex-row gap-x-12 flex-wrap"
      onSubmit={handleSubmitProductData}
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
