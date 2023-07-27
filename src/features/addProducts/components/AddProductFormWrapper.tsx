import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProduct,
  getProductById,
  uploadProductImage,
} from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import {
  ProductForm,
  ProductUploadImage,
  Products,
  UploadProductImageResponse,
} from "../../../../types";
import Swal from "sweetalert2";
import { ImSpinner8 } from "react-icons/im";
import { useLocation } from "react-router-dom";
import { Children, cloneElement, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProductBasicDetailsForm from "./ProductBasicDetailsForm";
import ProductMediaForm from "./ProductMediaForm";
import AddOrganizationForm from "./AddOrganizationForm";
import ProductColorsForm from "./ProductColorsForm";

type Props = {};

function AddProductFormWrapper({}: Props) {
  const { token } = useGetToken();
  const { register, watch, setValue, handleSubmit, reset } =
    useForm<ProductForm>();
  const { mutateAsync, isLoading: isLoadingMedia } = useMutation({
    mutationFn: (media: FormData) => uploadProductImage(media!, token!),
    mutationKey: ["media"],
  });
  const { mutate, isLoading: isLoadingProduct } = useMutation({
    mutationFn: (productData: ProductForm) => addProduct(productData, token),
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
    enabled: Boolean(ProductId),
  });
  const uploadProductImages = async (
    filesList: File[] | FileList | Array<string>
  ): Promise<UploadProductImageResponse> => {
    const formdata = new FormData();
    Array.from(filesList as File[]).forEach((file) =>
      formdata.append("product-image", file)
    );
    return await mutateAsync(formdata);
  };

  const setFormFields = (product: ProductForm | null) => {
    if (product !== null) {
      reset(product);
    } else {
      reset();
    }
  };

  const sendFullProductData = (
    productData: ProductForm,
    url: ProductUploadImage[]
  ): void => {
    mutate(
      { ...productData, images: url as any, thumbnail: url?.at(0)?.url! },
      {
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
      }
    );
  };
  const handleSubmitProductData: SubmitHandler<ProductForm> = (
    formData,
    ev
  ) => {
    ev?.preventDefault();

    uploadProductImages(formData.images)
      .then(({ data }) => {
        sendFullProductData(formData, data.images);
      })
      .then(() => setFormFields(null));
  };

  useEffect(() => {
    if (isSuccessProdById && !isLoadingProdById) {
      setFormFields(product.data.product as any);
    }
  }, [isLoadingProdById, isSuccessProdById, product]);

  return (
    <form
      action=""
      className="w-full flex flex-row gap-x-12 flex-wrap"
      onSubmit={handleSubmit(handleSubmitProductData)}
    >
      <article className="max-md:w-full w-[70%] flex flex-col">
        <ProductBasicDetailsForm register={register} />
        <ProductMediaForm register={register} setValue={setValue} />
      </article>
      <article className="w-[20%] max-md:w-full flex flex-col gap-3 h-44">
        <AddOrganizationForm register={register} />
        <ProductColorsForm
          setValue={setValue}
          watch={watch}
          register={register}
        />
      </article>

      <button
        type="submit"
        className="submit-btn max-sm:w-full w-1/4 ml-auto"
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
