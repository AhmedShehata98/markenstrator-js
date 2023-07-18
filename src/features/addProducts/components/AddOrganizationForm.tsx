import React from "react";
import InputGroup from "../../../components/InputGroup";

function AddOrganizationForm() {
  return (
    <div className="w-full flex flex-col items-center justify-between gap-3">
      <InputGroup dir="col" width={"100%"}>
        <label className="form-label" htmlFor="deliveryCost">
          delivery cost
        </label>
        <input
          className="form-input"
          type="text"
          name="deliveryCost"
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
          name="brand"
          id="brand"
          placeholder="brand ...."
        />
      </InputGroup>
    </div>
  );
}

export default AddOrganizationForm;
