import React, { ChangeEventHandler } from "react";

type VariantInputProps = {
  type: string;
  name: string;
  label: string;
  value?: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const VariantInput = ({
  label,
  name,
  type,
  value,
  id,
  onChange,
}: VariantInputProps) => {
  return (
    <span className="input-wrapper w-1/4 min-h-full">
      <label className="form-label mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onChange}
        className="min-w-full form-input"
        type={type}
        name={name}
        id={id}
        value={value}
      />
    </span>
  );
};

export default VariantInput;
