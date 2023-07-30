import React, { useEffect } from "react";
import InputGroup from "../../../components/InputGroup";
import { BiPlus } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Categories,
  Category,
  CategoryForm,
  UploadCategoryImageResponse,
} from "../../../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCategory,
  getCategoryById,
  updateCategory,
  uploadCategoryImages,
} from "../../../lib/apiMethods";
import useGetToken from "../../../Hooks/useGetToken";
import { ImSpinner8 } from "react-icons/im";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import AddCategoryBtn from "./AddCategoryBtn";
import PreviewThumbnailImage from "./PreviewThumbnailImage";
import PreviewThumbnailTitle from "./PreviewThumbnailTitle";
import ResetThumbnailBtn from "./ResetThumbnailBtn";
import SubmitCategoryBtn from "./SubmitCategoryBtn";
import ShowCategoryDataCard from "./ShowCategoryDataCard";
import PreviewWrapper from "./PreviewWrapper";

function CategoryFormWrapper() {
  const { register, watch, resetField, reset, handleSubmit, setValue } =
    useForm<CategoryForm>();
  const { token } = useGetToken();
  const { state } = useLocation();
  const isValidSrc = watch("image")?.length >= 1;
  const isFile = typeof watch("image") === "object";
  const {
    mutate: mutateCreateCategory,
    isLoading: isLoadingCategoryData,
    isSuccess: isSuccessCategoryData,
  } = useMutation({
    mutationFn: (
      categoryData:
        | Omit<Category, "slug" | "_id">
        | Omit<Category, "slug" | "_id" | "image">
    ) => addCategory(categoryData, token),
    mutationKey: ["add-category"],
  });
  const {
    mutate: mutateUpdateCategory,
    isLoading: isLoadingUpdateCategoryData,
    isSuccess: isSuccessUpdateCategoryData,
  } = useMutation({
    mutationFn: (
      newCategoryData:
        | Omit<Category, "slug" | "_id">
        | Omit<Category, "slug" | "_id" | "image">
    ) => updateCategory(newCategoryData, token, state?.id),
    mutationKey: ["update-category"],
  });
  const { mutateAsync, isLoading: isLoadingUploadCategoryImage } = useMutation({
    mutationFn: (image: FormData) => uploadCategoryImages(image, token),
    mutationKey: ["add-category-image"],
  });

  const { data: categoryData, isSuccess: isSuccessCategory } = useQuery({
    queryFn: () => getCategoryById(state?.id),
    queryKey: ["category", state?.id],
    enabled: Boolean(state?.id),
  });

  const resetThumbnail = () => {
    resetField("image");
  };

  const handleSetFieldValues = (category: Category) => {
    if (Boolean(category)) {
      setValue("image", category.image);
      setValue("name", category.name);
      setValue("description", category.description);
    }
  };

  const handleUploadImage = async (
    image: string
  ): Promise<UploadCategoryImageResponse> => {
    const fd = new FormData();
    fd.append("category-image", image[0]);
    return await mutateAsync(fd);
  };

  const sendCategoryData = (
    data: CategoryForm,
    imageUrl: Pick<UploadCategoryImageResponse, "data">
  ) => {
    const { image } = imageUrl.data;
    mutateCreateCategory(
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
          reset();
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

  const sendCategoryUpdatedData = (
    data:
      | Omit<Category, "slug" | "_id">
      | Omit<Category, "slug" | "_id" | "image">
  ) => {
    mutateUpdateCategory(
      {
        ...data,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Update Category",
            text: "category data was updated success .",
            icon: "success",
          });
        },
        onError: (err: any) => {
          Swal.fire({
            title: "Update Category",
            text: err.message,
            icon: "error",
          });
        },
      }
    );
  };
  const onSubmitHandler: SubmitHandler<CategoryForm> = (data) => {
    const { description, name } = data;

    if ((data.image as FileList | string) instanceof FileList) {
      handleUploadImage(data.image)
        .then((res) => {
          sendCategoryData(data, res);
        })
        .catch((err) =>
          Swal.fire({
            title: "upload Image",
            text: err.message,
            icon: "error",
          })
        );
    }
    sendCategoryUpdatedData({ description, name });
  };

  useEffect(() => {
    if (isSuccessCategory) {
      handleSetFieldValues(categoryData?.data.category);
    }
  }, [isSuccessCategory]);

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
          {!isValidSrc && <AddCategoryBtn />}
          <PreviewWrapper isValidSrc={isValidSrc}>
            <PreviewThumbnailImage isFile={isFile} watch={watch} />
            <span className="flex flex-col items-start gap-3 mx-2 max-md:mt-3">
              <PreviewThumbnailTitle isFile={isFile} watch={watch} />
              <ResetThumbnailBtn onReset={resetThumbnail} />
            </span>
          </PreviewWrapper>
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
        <SubmitCategoryBtn
          isLoadingCategoryData={
            isLoadingCategoryData ||
            isLoadingUpdateCategoryData ||
            isLoadingUploadCategoryImage
          }
          updateCategory={state?.updateCategory}
        />
      </article>
      <article className="max-md:w-full w-1/3 flex flex-col items-center justify-center">
        <ShowCategoryDataCard
          isFile={isFile}
          isValidSrc={isValidSrc}
          watch={watch}
        />
      </article>
    </form>
  );
}

export default CategoryFormWrapper;
