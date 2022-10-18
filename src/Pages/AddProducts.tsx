import { nanoid } from "@reduxjs/toolkit";
import React, { useLayoutEffect, useRef, useState } from "react";
import InputWrapper from "../components/InputWrapper";
import ProductMediaBox from "../components/ProductMediaBox";
import ProductMediaWrapper from "../components/ProductMediaWrapper";
import VariantItem from "../components/VariantItem";

const AddProducts = () => {
  let [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);
  let [variantsElements, setVariantsElements] = useState<React.ReactNode[]>([]);
  let index = useRef(0);

  function handleInputChange(ev: React.ChangeEvent): void {}
  const handleAddVariantItems = (_ev: React.MouseEvent): void => {
    let clonedReactComponent = React.cloneElement(<VariantItem />, {
      inputHandler: handleDeleteItem,
      key: nanoid(3),
      id: index.current,
    });

    setVariantsElements((prevEle) => [...prevEle, clonedReactComponent]);
    index.current = index.current + 1;
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setDocumentWidth((prev) => (prev = window.innerWidth));
    });
    return () =>
      removeEventListener("resize", () => {
        setDocumentWidth((prev) => (prev = window.innerWidth));
      });
  }, [window.innerWidth]);

  useLayoutEffect(() => {
    const initialElement = (
      <VariantItem
        key={nanoid(3)}
        id={index.current}
        inputHandler={handleInputChange}
      />
    );
    setVariantsElements((prevEle) => [...prevEle, initialElement]);
  }, []);

  return (
    <form
      className={`section-main`}
      style={
        documentWidth >= 1024
          ? { width: "calc(100% - 12rem)" }
          : { width: "100%" }
      }
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
                className="form-input"
                type="text"
                name="product-name"
                id="product-name"
                placeholder="product name here ..."
              />
            </InputWrapper>
            <InputWrapper extraClassName="w-1/3">
              <label className="form-label" htmlFor="price">
                price
              </label>
              <span className="flex items-end justify-start ">
                <select
                  className="h-9 bg-gray-300"
                  name="currency"
                  id="currency"
                >
                  <option value="USD">USD</option>
                  <option value="LE">EGP</option>
                </select>
                <input
                  className="form-input "
                  type="number"
                  name="price"
                  id="price"
                  placeholder="00.0"
                />
              </span>
            </InputWrapper>
          </div>
          <div className="w-full gap-4 flex justify-between">
            <InputWrapper extraClassName="w-full lg:w-2/3 ">
              <label className="form-label" htmlFor="SKU">
                SKU
              </label>
              <input
                className="form-input"
                type="text"
                name="SKU"
                id="SKU"
                placeholder="Eg: 12345abcde"
              />
            </InputWrapper>
            <InputWrapper extraClassName="w-1/3">
              <label className="form-label" htmlFor="product-name">
                weight
              </label>
              <span className="flex items-end justify-start ">
                <select
                  className="h-9 bg-gray-300"
                  name="currency"
                  id="measuring unit"
                >
                  <option value="KGS">KGS</option>
                </select>
                <input
                  className="form-input "
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="0.5"
                />
              </span>
            </InputWrapper>
          </div>
          <InputWrapper extraClassName="w-full flex flex-col mb-3">
            <label className="form-label" htmlFor="description">
              description
            </label>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-900 dark:focus:border-gray-900 mt-2"
              name="description"
              id="description"
              rows={4}
              placeholder="write product description here ..."
            ></textarea>
          </InputWrapper>
          <ProductMediaWrapper>
            <h3 className="absolute top-0 left-1 form-label ">media</h3>
            <ProductMediaBox
              key={nanoid(3)}
              className="bg-white rounded h-28 w-32 scroll-pl-3 snap-start snap-always dark:bg-zinc-800 border-2 border-slate-300"
            >
              <figure className="h-28 overflow-hidden">
                <img
                  className="aspect-square max-w-full object-cover"
                  src="https://picsum.photos/350"
                  alt="asset-img"
                />
              </figure>
            </ProductMediaBox>
            <ProductMediaBox
              key={nanoid(3)}
              className="bg-white rounded p-2 h-28 scroll-pl-3 snap-start snap-always min-w-max lg:w-30 dark:bg-zinc-800 border border-slate-300"
            >
              <label
                htmlFor="assets-select"
                className="h-24 w-30 flex flex-col items-center justify-center gap-1 text-gray-700 text-center capitalize cursor-pointer"
              >
                <span className="text-2xl text-cyan-800 dark:text-cyan-300">
                  <i className="fi fi-rr-picture"></i>
                </span>
                <p className="text-gray-800">browse images</p>
              </label>
              <input
                type="file"
                name="assets-select"
                id="assets-select"
                className="hidden"
              />
            </ProductMediaBox>
            <ProductMediaBox
              key={nanoid(3)}
              className="bg-white rounded p-2 h-28 scroll-pl-3 snap-start snap-always min-w-max lg:w-30 dark:bg-zinc-800 border border-slate-300"
            >
              <label
                htmlFor="assets-select"
                className="h-24 w-30 flex flex-col items-center justify-center gap-1 text-gray-700 text-center capitalize cursor-pointer"
              >
                <span className="text-2xl text-cyan-800 dark:text-cyan-300">
                  <i className="fi fi-rr-picture"></i>
                </span>
                <p className="text-gray-800">browse images</p>
              </label>
              <input
                type="file"
                name="assets-select"
                id="assets-select"
                className="hidden"
              />
            </ProductMediaBox>
            <ProductMediaBox
              key={nanoid(3)}
              className="bg-white rounded p-2 h-28 scroll-pl-3 snap-start snap-always min-w-max lg:w-30 dark:bg-zinc-800 border border-slate-300"
            >
              <label
                htmlFor="assets-select"
                className="h-24 w-30 flex flex-col items-center justify-center gap-1 text-gray-700 text-center capitalize cursor-pointer"
              >
                <span className="text-2xl text-cyan-800 dark:text-cyan-300">
                  <i className="fi fi-rr-picture"></i>
                </span>
                <p className="text-gray-800">browse images</p>
              </label>
              <input
                type="file"
                name="assets-select"
                id="assets-select"
                className="hidden"
              />
            </ProductMediaBox>
          </ProductMediaWrapper>
          <div className="relative max-w-full overflow-y-hidden overflow-x-auto gap-4 flex flex-col justify-between mb-2 pt-2">
            <h3 className="font-medium capitalize mb-3 text-gray-700 dark:text-gray-100">
              variants
            </h3>
            {variantsElements}
            <div className="w-full h-9 flex items-center justify-between gap-2 my-4">
              <button
                className="flex gap-2 justify-center items-center w-full h-full bg-zinc-200 border-2 border-dashed rounded border-cyan-700 dark:bg-zinc-800 dark:border-cyan-300 text-cyan-800 dark:text-cyan-300"
                type="button"
                onClick={(ev: React.MouseEvent<HTMLButtonElement>) =>
                  handleAddVariantItems(ev)
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
            name="brand"
            id="brand"
            placeholder="enter brand name ..."
          />
        </div>
        <div className="input-wrapper">
          <label className="form-label" htmlFor="brand">
            category
          </label>
          <input
            className="form-input"
            type="text"
            name="category"
            id="category"
            placeholder="enter category name ..."
          />
        </div>
        <div className="input-wrapper">
          <label className="form-label" htmlFor="brand">
            collection
          </label>
          <input
            className="form-input"
            type="text"
            name="collection"
            id="collection"
            placeholder="enter collection name ..."
          />
        </div>
        <div className="flex justify-center items-center mt-6 mb-3">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full xl:w-2/3 rounded-md px-4 py-2 bg-blue-600 text-white dark:bg-blue-400 dark:text-black hover:bg-blue-500 dark:hover:bg-blue-300 "
          >
            <span className="flex items-center justify-center">
              <i className="fi fi-br-add"></i>
            </span>
            <p>add new product</p>
          </button>
        </div>
      </article>
    </form>
  );
};

export default AddProducts;
