import React from "react";
import InputGroup from "../../../components/InputGroup";
import { getAllCategories } from "../../../lib/apiMethods";
import { useQuery } from "@tanstack/react-query";

function ProductBasicDetailsForm() {
  const {
    data: categories,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(["categories"], getAllCategories);
  return (
    <div className="w-full flex flex-col gap-6 mb-6">
      <div className="w-full flex items-center justify-between gap-3">
        <InputGroup dir="col" width="75%">
          <label className="form-label" htmlFor="prod-name">
            product name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="prod-name"
            placeholder="product name ...."
          />
        </InputGroup>
        <InputGroup dir="col" width="25%">
          <label className="form-label" htmlFor="price">
            price
          </label>
          <input
            className="form-input"
            type="number"
            name="price"
            id="price"
            placeholder="product price ...."
          />
        </InputGroup>
      </div>
      <div className="w-full flex items-center justify-between gap-3">
        <InputGroup dir="col" width="75%">
          <label className="form-label" htmlFor="SKU">
            SKU
          </label>
          <input
            className="form-input"
            type="text"
            name="sku"
            id="SKU"
            placeholder="SKU ...."
          />
        </InputGroup>
        <InputGroup dir="col" width="25%">
          <label className="form-label" htmlFor="stock">
            stock
          </label>
          <input
            className="form-input"
            type="number"
            name="stock"
            id="stock"
            placeholder="product stock ...."
          />
        </InputGroup>
      </div>
      <div className="w-full flex items-center justify-between gap-3">
        <InputGroup dir="col" width="75%">
          <label className="form-label" htmlFor="category">
            category
          </label>
          <select
            name="category_id"
            id="category"
            className="!py-2 accent-violet-400 focus:!border-violet-400"
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
          {/* <input
            className="form-input"
            type="text"
            name="name"
            id="SKU"
            placeholder="SKU ...."
          /> */}
        </InputGroup>
        <InputGroup dir="col" width="25%">
          <label className="form-label" htmlFor="discount">
            discount
          </label>
          <input
            className="form-input"
            type="number"
            name="discount"
            id="discount"
            placeholder="product discount ...."
          />
        </InputGroup>
      </div>
      <div className="w-full flex items-center justify-between gap-3">
        <InputGroup dir="col" width="50%">
          <label className="form-label" htmlFor="description">
            description
          </label>
          <textarea
            className="form-input"
            name="description"
            id="description"
            placeholder="description ...."
            rows={6}
          />
        </InputGroup>
        <InputGroup dir="col" width="50%">
          <label className="form-label" htmlFor="specifications">
            specifications
          </label>
          <textarea
            className="form-input"
            name="specifications"
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
