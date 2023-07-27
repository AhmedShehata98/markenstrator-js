import React from "react";
import InputGroup from "../../../components/InputGroup";
import { UseFormRegister } from "react-hook-form";
import { ProductForm } from "../../../../types";

type Props = {
  register: UseFormRegister<ProductForm>;
};
function AddOrganizationForm({ register }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-between gap-3">
      <InputGroup dir="col" width={"100%"}>
        <label className="form-label" htmlFor="deliveryCost">
          delivery cost
        </label>
        <input
          className="form-input"
          type="text"
          {...register("deliveryCost")}
          id="deliveryCost"
          defaultValue={0}
          placeholder="delivery Cost ...."
        />
      </InputGroup>
      <InputGroup dir="col" width={"100%"}>
        <label className="form-label" htmlFor="brand">
          brand
        </label>
        <input
          className="form-input"
          type="text"
          {...register("brand")}
          id="brand"
          placeholder="brand ...."
        />
      </InputGroup>
    </div>
  );
}

export default AddOrganizationForm;
