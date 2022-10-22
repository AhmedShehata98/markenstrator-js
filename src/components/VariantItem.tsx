import React, { ChangeEvent, useId } from "react";

type VariantProps = {
  children: React.ReactNode;
};
const VariantItem = ({ children }: VariantProps) => {
  return (
    <div className="variant-item">
      {children}
      {/* <span className="input-wrapper w-1/4 min-h-full">
        <label className="form-label mb-2" htmlFor="size">
          size
        </label>
        <input
          onChange={(ev: ChangeEvent) => inputHandler!(ev)}
          className="min-w-full form-input "
          type="number"
          name="size"
          id="size"
        />
      </span>
      <span className="input-wrapper w-1/4 min-h-full">
        <label className="form-label mb-2" htmlFor="color">
          color
        </label>
        <input
          onChange={(ev: ChangeEvent) => inputHandler!(ev)}
          className="min-w-full form-input"
          type="color"
          name="color"
          id="color"
        />
      </span>
      <span className="input-wrapper w-1/4 min-h-full">
        <label className="form-label mb-2" htmlFor="size">
          stock
        </label>
        <input
          onChange={(ev: ChangeEvent) => inputHandler!(ev)}
          className="min-w-full form-input"
          type="number"
          name="stock"
          id="stock"
        />
      </span>
      <span className="flex items-end justify-end w-1/4 min-h-full">
        <button
          className="py-2 px-2 lg:py-1 lg:px-4 flex items-center justify-center gap-2 capitalize bordder-0 font-semibold rounded bg-red-700 dark:bg-red-400 text-gray-200 dark:text-gray-900 hover:bg-red-600 dark:hover:bg-red-300"
          type="button"
          onClick={(ev) =>
            handleDeleteItem(ev, id, variantsState, setVariantfn)
          }
        >
          <span className="flex items-center">
            <i className="fi fi-rr-trash leading-3"></i>
          </span>
          <p className="hidden lg:block">remove</p>
        </button>
      </span> */}
    </div>
  );
};

export default VariantItem;
