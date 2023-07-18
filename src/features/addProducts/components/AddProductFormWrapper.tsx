import { useMutation } from "@tanstack/react-query";
import { addProduct, uploadProductImage } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import { Products, UploadProductImageResponse } from "../../../../types";
import Swal from "sweetalert2";

type Props = {
  children: React.ReactNode[];
};

function AddProductFormWrapper({ children }: Props) {
  const { token } = useGetToken();
  const { mutateAsync, isLoading, data } = useMutation({
    mutationFn: (media: FormData) => uploadProductImage(media!, token!),
    mutationKey: ["media"],
  });

  const { mutate } = useMutation({
    mutationFn: (productData: Partial<Products>) =>
      addProduct(productData, token),
    mutationKey: ["create-product"],
  });

  const uploadProductImages = async (filesList: FileList) => {
    const files = Array.from(filesList).slice(0, 6);
    const formdata = new FormData();
    files.forEach((file) => formdata.append("product-image", file));
    let images = files.map((file) => ({
      details: file,
      url: URL.createObjectURL(file),
    }));
    return await mutateAsync(formdata);
  };

  const handleSubmitProductData = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formdata = new FormData(ev.currentTarget);
    const name = formdata.get("name")?.toString(),
      price = Number(formdata.get("price")),
      sku = formdata.get("SKU")?.toString(),
      stock = Number(formdata.get("stock")),
      categoryId = formdata.get("category")?.toString(),
      discount = Number(formdata.get("discount")),
      description = formdata.get("description")?.toString(),
      specifications = formdata.get("specifications")?.toString(),
      deliveryCost = Number(formdata.get("deliveryCost")),
      brand = formdata.get("brand")?.toString(),
      colors = formdata.getAll("colors-list") as Array<string>,
      images = formdata.getAll("product-image") as File[] | FileList[];

    const reader = new FileReader();
    reader.onload = function (ev: ProgressEvent<FileReader>) {
      console.log(reader.result);
    };
    reader.readAsText(images[0]);
    uploadProductImages(images!).then((res: UploadProductImageResponse) => {
      const imagesUrls = res.data.images;
      mutate(
        {
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
          images: imagesUrls,
          thumbnail: imagesUrls[0],
        },
        {
          onError(error) {
            Swal.fire({
              title: "add product",
              text: "error encorrect data",
              icon: "error",
              confirmButtonText: "close",
            });
            console.log(error);
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
    });
  };

  return (
    <form
      action=""
      className="w-full flex flex-row gap-x-12 flex-wrap"
      onSubmit={handleSubmitProductData}
    >
      {children}
      <button type="submit" className="submit-btn w-1/4 ml-auto">
        add product
      </button>
    </form>
  );
}

export default AddProductFormWrapper;
