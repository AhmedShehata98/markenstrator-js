import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useForm, SubmitHandler, UseFormSetValue } from "react-hook-form";
import InputWrapper from "../components/InputWrapper";
import ProductMediaBox from "../components/ProductMediaBox";
import ProductMediaWrapper from "../components/ProductMediaWrapper";
import VariantInput from "../components/VariantInput";
import VariantItem from "../components/VariantItem";
import PreviewUploadedMedia from "../components/PreviewUploadedMedia";
import MediaInput from "../components/MediaInput";
import {
  IClonedVariants,
  IProductFormData,
  MediaType,
  VariantsType,
} from "../Types/pages-types";
import { useAppSelector } from "../Redux/ReduxHooks";

const AddProducts = () => {
  const { initinalProductsData } = useAppSelector(
    (state) => state["app-settings"]
  );
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Partial<IProductFormData>>();
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  const [clonedVariants, setClonedVariants] = useState<IClonedVariants[]>([]);
  // const [ClonedMediaInput, setClonedMediaInput] = useState<IClonedMediaInput[]>(
  //   []
  // );
  const [mediaInputList, setMediaInputList] = useState<MediaType[]>([]);
  const isClonedVariants = useRef<boolean>(false);
  // const isClonedMedia = useRef<boolean>(false);

  const variantsDataList = useRef<VariantsType[]>([]);
  const variantsSchemaData = useRef<VariantsType>({
    id: "8",
    color: "#e66465",
    size: 0,
    stock: 0,
  });
  const mediaInputSchemaData = useRef<MediaType>({
    id: "",
    assest: {},
  });

  function handleDeleteVariant(
    _ev: React.MouseEvent,
    id: number | string,
    stateSetter: React.Dispatch<React.SetStateAction<any>>
  ): void {
    stateSetter((prevEle: IClonedVariants[]) =>
      prevEle.filter((ele) => ele.id !== id)
    );
  }
  function handleVariantData(
    ev: React.ChangeEvent<HTMLInputElement>,
    dataStore: typeof variantsSchemaData
  ): void {
    const name = ev.target.name;
    const value = ev.target.value;

    //

    if (name !== "color") {
      dataStore.current = {
        ...dataStore.current,
        [name]: +value,
      };
    } else {
      dataStore.current = {
        ...dataStore.current,
        [name]: value,
      };
    }
  }
  const changeAddBtnStyle = (ev: React.MouseEvent) => {
    const element = ev.target as HTMLButtonElement;
    const icon = element.firstChild?.firstChild as Element;
    const pragraph = element.lastElementChild as HTMLParagraphElement;
    if (icon.classList.contains("fi-rr-plus")) {
      icon.classList.replace("fi-rr-plus", "fi-br-check");
    }
    element.classList.add(...["select-none", "pointer-events-none"]);
    element.classList.replace("bg-slate-600", "bg-emerald-600");
    element.classList.replace("dark:bg-slate-600", "dark:bg-emerald-300");
    element.classList.replace("dark:text-gray-100", "dark:text-gray-700");
    pragraph.innerText = "done";
  };

  const setFieldsReadonly = (ev: React.MouseEvent) => {
    const element = ev.target as Element;

    const topLevelParentElement = element.closest(
      ".variant-item"
    ) as HTMLDivElement;
    const childrenNodesLength: number = topLevelParentElement?.children.length;
    const sizeElem = topLevelParentElement?.firstElementChild
      ?.lastElementChild as HTMLInputElement;
    const colorElem = topLevelParentElement?.children[childrenNodesLength - 3]
      .lastElementChild as HTMLInputElement;
    const stockElem = topLevelParentElement?.children[childrenNodesLength - 2]
      .lastElementChild as HTMLInputElement;
    //
    //
    colorElem.disabled = true;
    stockElem.disabled = true;
    sizeElem.disabled = true;
  };

  function addToVariantList(
    ev: React.MouseEvent,
    storeData: typeof variantsDataList,
    variantSchemaData: typeof variantsSchemaData,
    id: string
  ): void {
    variantSchemaData.current = { ...variantSchemaData.current, id };
    storeData.current.push(variantSchemaData.current);
    //
    changeAddBtnStyle(ev);
    setFieldsReadonly(ev);
    setValue("variants", storeData.current);
  }

  function removeFromVariantList(
    ev: React.MouseEvent<HTMLButtonElement>,
    dataList: typeof variantsDataList
  ) {
    const element = ev.target as Element;
    const topLevelParentElement = element.closest(
      ".variant-item"
    ) as HTMLDivElement;
    const childrenNodesLength: number = topLevelParentElement.children.length;
    const sizeElem = topLevelParentElement?.firstElementChild
      ?.lastElementChild as HTMLInputElement;
    const sizeValue = sizeElem.valueAsNumber;

    const stockElem = topLevelParentElement?.children[childrenNodesLength - 2]
      .lastElementChild as HTMLInputElement;
    const stockValue = stockElem.valueAsNumber;
    const filterdList = dataList.current.filter(
      (data) => data.size !== sizeValue && data.stock !== stockValue
    );
    dataList.current = filterdList;
  }

  const addNewVariantElement = (
    setStateFn: React.Dispatch<React.SetStateAction<IClonedVariants[]>>,
    id: string | number
  ) => {
    const variantsElement: JSX.Element = (
      <VariantItem>
        <VariantInput
          key={nanoid(3)}
          id="size"
          label="size"
          name="size"
          type="number"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            handleVariantData(ev, variantsSchemaData)
          }
        />
        <VariantInput
          key={nanoid(3)}
          id="color"
          label="color"
          name="color"
          type="color"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            handleVariantData(ev, variantsSchemaData)
          }
        />
        <VariantInput
          key={nanoid(3)}
          id="stock"
          label="stock"
          name="stock"
          type="number"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            handleVariantData(ev, variantsSchemaData)
          }
        />
        <span className="flex items-end justify-end gap-2 w-1/4 min-h-full">
          <button
            className="py-2 px-2 lg:py-1 lg:px-2 flex items-center justify-center gap-1 capitalize bordder-0 font-semibold rounded bg-red-700 dark:bg-red-400 text-gray-200 dark:text-gray-900 hover:bg-red-600 dark:hover:bg-red-300"
            type="button"
            onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
              handleDeleteVariant(ev, id, setClonedVariants);
              removeFromVariantList(ev, variantsDataList);
            }}
          >
            <span className="flex items-center select-none pointer-events-none">
              <i className="fi fi-rr-trash leading-3 select-none pointer-events-none"></i>
            </span>
            <p className="hidden lg:block select-none pointer-events-none">
              delete
            </p>
          </button>
          <button
            className="py-2 px-2 lg:py-1 lg:px-2 flex items-center justify-center gap-2 capitalize bordder-0 font-semibold rounded bg-slate-600 dark:bg-slate-600 text-gray-200 dark:text-gray-100 hover:bg-slate-600 dark:hover:bg-slate-500"
            type="button"
            onClick={(ev: React.MouseEvent) =>
              addToVariantList(
                ev,
                variantsDataList,
                variantsSchemaData,
                nanoid(2)
              )
            }
          >
            <span className="flex items-center select-none pointer-events-none">
              <i className="fi fi-rr-plus leading-3 select-none pointer-events-none"></i>
            </span>
            <p className="hidden lg:block select-none pointer-events-none">
              add
            </p>
          </button>
        </span>
      </VariantItem>
    );
    const props = {
      key: nanoid(3),
    };
    const ClonedElement = React.cloneElement(variantsElement, props);
    const objectSchema: IClonedVariants = {
      element: ClonedElement,
      id,
    };
    setStateFn((prevElem) => [...prevElem, objectSchema]);
  };

  const handleAddToMediaList = (
    mediadataSchema: typeof mediaInputSchemaData,
    setMediaInputList: React.Dispatch<React.SetStateAction<MediaType[]>>
  ) => {
    setMediaInputList((currentList: MediaType[]): MediaType[] => [
      ...currentList,
      mediadataSchema.current,
    ]);
  };

  const handleMediaInputData = (
    ev: React.ChangeEvent<HTMLInputElement>,
    mediaInputSchemaData: React.MutableRefObject<MediaType>,
    setMediaInputList: React.Dispatch<React.SetStateAction<MediaType[]>>,
    mediaInputList: MediaType[],
    id: string
  ): void => {
    const value: object | undefined = ev.target.files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(ev.target.files![0]);
    fileReader.onload = () => {
      mediaInputSchemaData.current = {
        id,
        assest: value,
        fileLivePreview: fileReader.result as string,
      };
      handleAddToMediaList(mediaInputSchemaData, setMediaInputList);
    };
  };

  const handleDeleteMediaAsset = (
    id: string,
    setMediaInputList: React.Dispatch<React.SetStateAction<MediaType[]>>
  ): void => {
    setMediaInputList((currData: MediaType[]): MediaType[] => {
      const filterdData = currData.filter((data) => data.id !== id);
      setValue("media", mediaInputList);
      return filterdData;
    });
  };

  const sendProductData: SubmitHandler<Partial<IProductFormData>> = (data) => {
    console.table(data);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setDocumentWidth(window.innerWidth);
    });
    return () =>
      removeEventListener("resize", () => {
        setDocumentWidth(window.innerWidth);
      });
  }, [window.innerWidth]);

  useLayoutEffect(() => {
    if (isClonedVariants.current === false) {
      addNewVariantElement(setClonedVariants, nanoid(3));
      isClonedVariants.current = true;
    }
  }, []);
  // useLayoutEffect(() => {
  //   if (isClonedMedia.current === false) {
  //     addNewMediaInput(nanoid(6), setClonedMediaInput);
  //     isClonedMedia.current = true;
  //   }
  // }, []);

  useEffect(() => {
    if (
      typeof initinalProductsData === "object" &&
      Object.keys(initinalProductsData).length > 0
    ) {
      reset({
        productName: initinalProductsData?.productName || "",
        price: {
          value: initinalProductsData?.price?.value || 0,
          unit: initinalProductsData?.price?.unit || "",
        },
        sku: initinalProductsData?.sku || "",
        weight: {
          value: initinalProductsData?.weight?.value || 0,
          unit: initinalProductsData?.weight?.unit || "",
        },
        description: initinalProductsData.description,
        media: initinalProductsData.media,
        variants: initinalProductsData.variants,
        brand: initinalProductsData.brand || "",
        category: initinalProductsData.category || "",
        collection: initinalProductsData.collection || "",
      });
      setMediaInputList(initinalProductsData.media as MediaType[]);
      variantsDataList.current.push(...initinalProductsData.variants!);
    }
  }, [initinalProductsData, reset]);

  return (
    <form
      className={`section-main`}
      style={
        documentWidth >= 1024
          ? { width: "calc(100% - 12rem)" }
          : { width: "100%" }
      }
      onSubmit={handleSubmit(sendProductData)}
    >
      <article className="flex flex-col gap-2 min-h-screen w-full lg:w-[70%] p-2 rounded bg-white dark:bg-zinc-900">
        <h5 className="font-bold capitalize text-gray-800 dark:text-gray-100 mb-3 lg:mt-5">
          product details
        </h5>
        <div className="w-full flex flex-col gap-2 items-start justify-between">
          <div className="w-full gap-4 flex justify-between">
            <InputWrapper extraClassName=" w-full lg:w-2/3 ">
              <label className="form-label" htmlFor="product-name">
                product name
              </label>
              <input
                className={`
                  form-input ${
                    Boolean(errors.productName?.message)
                      ? "border-red-500"
                      : null
                  }
                  `}
                id="product-name"
                placeholder="product name here ..."
                type="text"
                {...register("productName", {
                  required: "this field is required",
                })}
              />
              {Boolean(errors.productName?.message) && (
                <small className="font-mono text-red-400">
                  {errors.productName?.message}
                </small>
              )}
            </InputWrapper>
            <InputWrapper extraClassName="w-1/3">
              <label className="form-label" htmlFor="price">
                price
              </label>
              <span className="flex items-end justify-start ">
                <select
                  className="h-9 bg-gray-300"
                  {...register("price.unit")}
                  value={"EGP"}
                >
                  <option value="USD">USD</option>
                  <option value="LE">EGP</option>
                </select>
                <input
                  className={`
                    form-input ${
                      Boolean(errors.price?.value?.message)
                        ? "border-red-500"
                        : null
                    }
                    `}
                  type="number"
                  id="price"
                  placeholder="00.0"
                  {...register("price.value", {
                    required: "this field is required",
                  })}
                />
              </span>
              {Boolean(errors.price?.value?.message) && (
                <small className="font-mono text-red-400">
                  {errors.price?.value?.message}
                </small>
              )}
            </InputWrapper>
          </div>
          <div className="w-full gap-4 flex justify-between">
            <InputWrapper extraClassName="w-full lg:w-2/3 ">
              <label className="form-label" htmlFor="SKU">
                SKU
              </label>
              <input
                className={`
                form-input ${
                  Boolean(errors.sku?.message) ? "border-red-500" : null
                }
                `}
                type="text"
                id="SKU"
                placeholder="Eg: 12345abcde"
                {...register("sku", { required: "this field is requied" })}
              />
              {Boolean(errors.sku?.message) && (
                <small className="font-mono text-red-400">
                  {errors.sku?.message}
                </small>
              )}
            </InputWrapper>
            <InputWrapper extraClassName="w-1/3">
              <label className="form-label" htmlFor="product-name">
                weight
              </label>
              <span className="flex items-end justify-start ">
                <select
                  className="h-9 bg-gray-300"
                  {...register("weight.unit")}
                  value={"KGS"}
                >
                  <option value="KGS">KGS</option>
                  <option value="MGS">MGS</option>
                  <option value="GS">GS</option>
                  <option value="pounds">pounds</option>
                </select>
                <input
                  className={`
                  form-input ${
                    Boolean(errors.weight?.value?.message)
                      ? "border-red-500"
                      : null
                  }
                  `}
                  type="number"
                  id="weight"
                  placeholder="0.5"
                  {...register("weight.value", {
                    required: "this field is requied",
                  })}
                />
              </span>
              {Boolean(errors.weight?.value?.message) && (
                <small className="font-mono text-red-400">
                  {errors.weight?.value?.message}
                </small>
              )}
            </InputWrapper>
          </div>
          <InputWrapper extraClassName="w-full flex flex-col mb-3">
            <label className="form-label" htmlFor="description">
              description
            </label>
            <textarea
              className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-900 dark:focus:border-gray-900 mt-2 ${
                Boolean(errors.description?.message) ? "border-red-500" : null
              }`}
              id="description"
              rows={4}
              placeholder="write product description here ..."
              {...register("description", {
                required: "this field is requied",
              })}
            ></textarea>
            {Boolean(errors.description?.message) && (
              <small className="font-mono text-red-400">
                {errors.description?.message}
              </small>
            )}
          </InputWrapper>
          <ProductMediaWrapper>
            <h3 className="absolute top-0 left-1 form-label ">media</h3>

            {getValues("media") !== undefined
              ? getValues("media")?.map((media) => {
                  return (
                    <ProductMediaBox
                      key={nanoid(3)}
                      className="relative bg-white rounded h-28 min-w-max lg:h-28 lg:w-28 scroll-pl-3 snap-start snap-always overflow-hidden dark:bg-zinc-800 border-2 border-zinc-200"
                    >
                      <PreviewUploadedMedia
                        key={nanoid(3)}
                        alt={`media-assest #${media.id}`}
                        imageSrc={media.fileLivePreview}
                        onClick={() =>
                          handleDeleteMediaAsset(media.id, setMediaInputList)
                        }
                      />
                    </ProductMediaBox>
                  );
                })
              : mediaInputList.map((media) => {
                  return (
                    <ProductMediaBox
                      key={nanoid(3)}
                      className="relative bg-white rounded h-28 min-w-max lg:h-28 lg:w-28 scroll-pl-3 snap-start snap-always overflow-hidden dark:bg-zinc-800 border-2 border-zinc-200"
                    >
                      <PreviewUploadedMedia
                        key={nanoid(3)}
                        alt={`media-assest #${media.id}`}
                        imageSrc={media.fileLivePreview}
                        onClick={() =>
                          handleDeleteMediaAsset(media.id, setMediaInputList)
                        }
                      />
                    </ProductMediaBox>
                  );
                })}
            <ProductMediaBox
              key={nanoid(3)}
              className="bg-white rounded p-2 h-28 scroll-pl-3 snap-start snap-always shadow min-w-max lg:w-30 dark:bg-zinc-700 border border-slate-300 dark:border-slate-500"
            >
              <MediaInput
                id={"media-assets"}
                label={"browse image"}
                type={"file"}
                name={"media"}
                key={nanoid(4)}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                  handleMediaInputData(
                    ev,
                    mediaInputSchemaData,
                    setMediaInputList,
                    mediaInputList,
                    nanoid(4)
                  );
                  setValue("media", mediaInputList);
                }}
              />
            </ProductMediaBox>
          </ProductMediaWrapper>
          <div className="relative min-w-full overflow-y-hidden overflow-x-auto gap-4 flex flex-col justify-between mb-2 pt-2">
            <h3 className="font-medium capitalize mb-3 text-gray-700 dark:text-gray-100">
              variants
            </h3>
            {getValues("variants") !== undefined
              ? getValues("variants")?.map((elem) => {
                  return (
                    <VariantItem key={nanoid(4)}>
                      <VariantInput
                        key={nanoid(3)}
                        id="size"
                        label="size"
                        name="size"
                        type="number"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantData(ev, variantsSchemaData)
                        }
                        value={elem.size.toString()}
                      />
                      <VariantInput
                        key={nanoid(3)}
                        id="color"
                        label="color"
                        name="color"
                        type="color"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantData(ev, variantsSchemaData)
                        }
                        value={elem.color.toString()}
                      />
                      <VariantInput
                        key={nanoid(3)}
                        id="stock"
                        label="stock"
                        name="stock"
                        type="number"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantData(ev, variantsSchemaData)
                        }
                        value={elem.stock.toString()}
                      />
                      <span className="flex items-end justify-end gap-2 w-1/4 min-h-full">
                        <button
                          className="py-2 px-2 lg:py-1 lg:px-2 flex items-center justify-center gap-1 capitalize bordder-0 font-semibold rounded bg-red-700 dark:bg-red-400 text-gray-200 dark:text-gray-900 hover:bg-red-600 dark:hover:bg-red-300"
                          type="button"
                          onClick={(
                            ev: React.MouseEvent<HTMLButtonElement>
                          ) => {
                            handleDeleteVariant(ev, elem.id, setClonedVariants);
                            removeFromVariantList(ev, variantsDataList);
                          }}
                        >
                          <span className="flex items-center select-none pointer-events-none">
                            <i className="fi fi-rr-trash leading-3 select-none pointer-events-none"></i>
                          </span>
                          <p className="hidden lg:block select-none pointer-events-none">
                            delete
                          </p>
                        </button>
                        <button
                          className="py-2 px-2 lg:py-1 lg:px-2 flex items-center justify-center gap-2 capitalize bordder-0 font-semibold rounded text-gray-200 hover:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-700 dark:bg-emerald-300 bg-emerald-600 select-none pointer-events-none"
                          type="button"
                          onClick={(ev: React.MouseEvent) =>
                            addToVariantList(
                              ev,
                              variantsDataList,
                              variantsSchemaData,
                              nanoid(3)
                            )
                          }
                        >
                          <span className="flex items-center select-none pointer-events-none">
                            <i className="fi fi-br-check leading-3 select-none pointer-events-none"></i>
                          </span>
                          <p className="hidden lg:block select-none pointer-events-none">
                            add
                          </p>
                        </button>
                      </span>
                    </VariantItem>
                  );
                })
              : clonedVariants.map((elem) => elem.element)}
            <div className="w-full h-9 flex items-center justify-between gap-2 my-4">
              <button
                className="flex gap-2 justify-center items-center w-full h-full bg-zinc-200 border-2 border-dashed rounded border-cyan-700 dark:bg-zinc-800 dark:border-cyan-300 text-cyan-800 dark:text-cyan-300"
                type="button"
                onClick={(ev: React.MouseEvent) =>
                  addNewVariantElement(setClonedVariants, nanoid(3))
                }
              >
                <span className="flex items-center justify-center">
                  <i className="fi fi-sr-plus-small leading-3"></i>
                </span>
                <p>add new variant</p>
              </button>
            </div>
          </div>
        </div>
      </article>
      <article className="flex flex-col gap-2 min-h-screen w-full lg:w-[28%] p-2 rounded bg-white dark:bg-zinc-900">
        <h3 className="font-bold capitalize text-gray-800 dark:text-gray-100 mb-3 lg:mt-5">
          organization
        </h3>
        <div className="input-wrapper">
          <label className="form-label" htmlFor="brand">
            brand
          </label>
          <input
            className="form-input"
            type="text"
            id="brand"
            placeholder="enter brand name ..."
            {...register("brand")}
          />
        </div>
        <div className="input-wrapper">
          <label className="form-label" htmlFor="brand">
            category
          </label>
          <input
            className="form-input"
            type="text"
            id="category"
            placeholder="enter category name ..."
            {...register("category")}
          />
        </div>
        <div className="input-wrapper">
          <label className="form-label" htmlFor="brand">
            collection
          </label>
          <input
            className="form-input"
            type="text"
            id="collection"
            placeholder="enter collection name ..."
            {...register("collection")}
          />
        </div>
        <div className="flex justify-center items-center mt-6 mb-3">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full xl:w-3/4 rounded px-4 py-2 bg-blue-700 text-white dark:bg-blue-400 dark:text-black hover:bg-blue-500 dark:hover:bg-blue-300 disabled:bg-zinc-400"
          >
            <span className="flex items-center justify-center">
              <i className="fi fi-br-add leading-3"></i>
            </span>
            <p>add new product</p>
          </button>
        </div>
      </article>
    </form>
  );
};

export default React.memo(AddProducts);
