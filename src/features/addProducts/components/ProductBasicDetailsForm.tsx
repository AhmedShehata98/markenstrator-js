import React from "react";
import InputGroup from "../../../components/InputGroup";
import { getAllCategories } from "../../../lib/apiMethods";
import { useQuery } from "@tanstack/react-query";
import { UseFormRegister } from "react-hook-form";
import { ProductForm } from "../../../../types";

type Props = {
  register: UseFormRegister<ProductForm>;
};
function ProductBasicDetailsForm({ register }: Props) {
  const {
    data: categories,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(["categories"], getAllCategories);
  return (
    <div className="w-full flex flex-col gap-6 mb-6">
      <div className="w-full flex max-sm:flex-col items-center justify-between gap-3">
        <InputGroup dir="col" width="75%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="prod-name">
            product name
          </label>
          <input
            className="form-input"
            type="text"
            {...register("name")}
            id="prod-name"
            placeholder="product name ...."
          />
        </InputGroup>
        <InputGroup dir="col" width="25%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="price">
            price
          </label>
          <input
            className="form-input"
            type="number"
            {...register("price")}
            id="price"
            placeholder="product price ...."
          />
        </InputGroup>
      </div>
      <div className="w-full flex max-sm:flex-col items-center justify-between gap-3">
        <InputGroup dir="col" width="75%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="SKU">
            SKU
          </label>
          <input
            className="form-input"
            type="text"
            {...register("sku")}
            id="SKU"
            placeholder="SKU ...."
          />
        </InputGroup>
        <InputGroup dir="col" width="25%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="stock">
            stock
          </label>
          <input
            className="form-input"
            type="number"
            {...register("stock")}
            id="stock"
            placeholder="product stock ...."
          />
        </InputGroup>
      </div>
      <div className="w-full flex max-sm:flex-col items-center justify-between gap-3">
        <InputGroup dir="col" width="75%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="category">
            category
          </label>
          <select
            {...register("category_id")}
            id="category"
            className="!py-2 accent-violet-400 focus:!border-violet-400"
            defaultValue={
              isSuccess
                ? categories.data.categories.at(Math.random() * 10)?._id
                : "wait.."
            }
          >
            {isLoading && (
              <option value="loading">Loading Categories ...</option>
            )}
            {!isLoading &&
              isSuccess &&
              categories.data.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            {!isLoading && isError && (
              <option value="fetching-error">
                error happend when fetching data
              </option>
            )}
          </select>
        </InputGroup>
        <InputGroup dir="col" width="25%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="discount">
            discount
          </label>
          <input
            className="form-input"
            type="number"
            {...register("discount")}
            id="discount"
            placeholder="product discount ...."
          />
        </InputGroup>
      </div>
      <div className="w-full flex max-sm:flex-col items-center justify-between gap-3">
        <InputGroup dir="col" width="50%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="description">
            description
          </label>
          <textarea
            className="form-input"
            {...register("description")}
            id="description"
            placeholder="description ...."
            rows={6}
          />
        </InputGroup>
        <InputGroup dir="col" width="50%" extraClassName="max-sm:!w-full">
          <label className="form-label" htmlFor="specifications">
            specifications
          </label>
          <textarea
            className="form-input"
            {...register("specifications")}
            id="specifications"
            placeholder="specifications ...."
            rows={6}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default ProductBasicDetailsForm;
