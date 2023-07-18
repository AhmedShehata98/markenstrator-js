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
import { Products } from "../../types";
import AddOrganizationForm from "../features/addProducts/components/AddOrganizationForm";
import ProductBasicDetailsForm from "../features/addProducts/components/ProductBasicDetailsForm";
import ProductColorsForm from "../features/addProducts/components/ProductColorsForm";
import ProductMediaForm from "../features/addProducts/components/ProductMediaForm";
import AddProductFormWrapper from "../features/addProducts/components/AddProductFormWrapper";

const AddProducts = () => {
  const imageUrls = useRef([""]);
  const colorsList = useRef([""]);

  return (
    <main className="w-full lg:w-5/6 xl:w-[88%] h-screen max-h-screen overflow-y-auto max-lg:px-3 lg:px-4 lg:py-3 lg:mt-14 lg:ml-auto">
      <section className="w-full max-md:w-full">
        <AddProductFormWrapper>
          <article className="flex flex-col w-[70%]">
            <ProductBasicDetailsForm />
            <ProductMediaForm imageUrls={imageUrls} />
          </article>
          <article className="flex flex-col gap-3 w-[20%] h-44">
            <AddOrganizationForm />
            <ProductColorsForm />
          </article>
        </AddProductFormWrapper>
      </section>
      {/* <section className="max-md:w-full w-1/4"></section> */}
    </main>
  );
};

export default React.memo(AddProducts);
