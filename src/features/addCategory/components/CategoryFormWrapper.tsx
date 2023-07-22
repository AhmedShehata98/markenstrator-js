import React from "react";
import InputGroup from "../../../components/InputGroup";
import { BiPlus } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Categories,
  CategoryForm,
  UploadCategoryImageResponse,
} from "../../../../types";
import { useMutation } from "@tanstack/react-query";
import { addCategory, uploadCategoryImages } from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import { ImSpinner8 } from "react-icons/im";
import Swal from "sweetalert2";

function CategoryFormWrapper() {
  const { register, watch, resetField, handleSubmit } = useForm<CategoryForm>();
  const { token } = useGetToken();
  const isValidSrc = watch("image")?.length >= 1;
  const {
    mutate,
    isLoading: isLoadingCategoryData,
    isSuccess: isSuccessCategoryData,
  } = useMutation({
    mutationFn: (categoryData: Partial<Categories>) =>
      addCategory(categoryData, token),
    mutationKey: ["add-category"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: (image: FormData) => uploadCategoryImages(image, token),
    mutationKey: ["add-category-image"],
  });

  const resetThumbnail = () => {
    resetField("image");
  };

  const handleUploadImage = async (
    image: string
  ): Promise<UploadCategoryImageResponse> => {
    const fd = new FormData();
    fd.append("category-image", image[0]);
    return await mutateAsync(fd);
  };
  const handleSubmitCategoryData = (
    data: CategoryForm,
    imageUrl: Pick<UploadCategoryImageResponse, "data">
  ) => {
    const { image } = imageUrl.data;
    mutate(
      {
        image: image.url,
        name: data.name,
        description: data.description,
      },
      {
        onSuccess(data) {
          Swal.fire({
            icon: "success",
            text: data.message,
            title: "add category",
            confirmButtonText: "okay",
          });
        },
        onError(data) {
          Swal.fire({
            icon: "error",
            text: JSON.stringify(data),
            title: "add category",
            confirmButtonText: "close",
          });
        },
      }
    );
  };
  const onSubmitHandler: SubmitHandler<CategoryForm> = (data) => {
    handleUploadImage(data.image).then((res) => {
      handleSubmitCategoryData(data, res);
    });
  };

  return (
    <form
      action=""
      className="flex gap-3 justify-around max-md:flex-col-reverse"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <article className="max-md:w-full w-4/6 flex flex-col gap-3 my-6">
        <InputGroup
          dir="row"
          width={"100%"}
          extraClassName="gap-3 items-center justify-center"
        >
          {!isValidSrc && (
            <>
              <label
                htmlFor="categoty-image"
                className="w-36 flex flex-col items-center justify-center self-center bg-gray-100 aspect-square shadow-md rounded-lg border-2 border-gray-500 border-dashed mt-6"
              >
                <BiPlus className="pointer-events-none m-auto text-5xl" />
                <p className="py-3 uppercase text-gray-600 font-medium">
                  add thumbnail
                </p>
              </label>
            </>
          )}
          {isValidSrc && (
            <div className="flex items-center justify-center max-md:flex-col">
              <figure className="w-32 rounded-full overflow-hidden aspect-square shadow-md border-4 border-violet-600">
                <img
                  src={
                    isValidSrc && URL.createObjectURL(watch("image")[0] as any)
                  }
                  alt="preview"
                />
              </figure>
              <span className="flex flex-col items-start gap-3 mx-2 max-md:mt-3">
                <figcaption className="text-gray-600">
                  {(watch("image")[0] as any).name}
                </figcaption>
                <button
                  type="button"
                  className="px-3 py-1 shadow bg-violet-700 rounded text-white capitalize hover:bg-violet-500"
                  onClick={resetThumbnail}
                >
                  reset thumbnail
                </button>
              </span>
            </div>
          )}
          <input
            type="file"
            {...register("image")}
            id="categoty-image"
            hidden
          />
        </InputGroup>
        <InputGroup dir="col" width={"100%"} extraClassName="mt-12">
          <label className="form-label" htmlFor="name">
            name
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="form-input"
          />
        </InputGroup>
        <InputGroup dir="col" width={"100%"}>
          <label className="form-label" htmlFor="description">
            description
          </label>
          <textarea
            rows={3}
            {...register("description")}
            id="description"
            className="!form-input"
            maxLength={150}
          />
          <span className="flex items-center justify-start mt-1 gap-2">
            <p>count :</p>
            <b className="text-violet-600">
              {watch("description")?.length ?? 0}
            </b>
            <p>from </p>
            <b>150</b>
          </span>
        </InputGroup>
        <button
          type="submit"
          className="submit-btn self-end mt-6 max-md:w-full w-1/3"
          disabled={isLoadingCategoryData}
        >
          {!isLoadingCategoryData && "add category"}
          {isLoadingCategoryData && (
            <ImSpinner8 className="inline-block text-xl animate-spin" />
          )}
        </button>
      </article>
      <article className="max-md:w-full w-1/3 flex flex-col items-center justify-center">
        {isValidSrc && (
          <ul className="max-md:w-full w-3/5 flex flex-col items-center justify-center gap-2 shadow-lg rounded-md border p-4">
            <li className="w-full overflow-hidden">
              <figure className="w-full aspect-square rounded-md shadow overflow-hidden">
                <img
                  src={
                    isValidSrc && URL.createObjectURL(watch("image")[0] as any)
                  }
                  alt="category-img-preview"
                  className="max-w-full object-cover"
                />
              </figure>
            </li>
            <li className="text-gray-800 font-semibold capitalize mt-6">
              <h4>{watch("name")}</h4>
            </li>
            <li>
              <h4 className="text-gray-600 ">{watch("description")}</h4>
            </li>
          </ul>
        )}
      </article>
    </form>
  );
}

export default CategoryFormWrapper;
