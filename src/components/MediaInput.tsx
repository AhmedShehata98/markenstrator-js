import React from "react";

type MediaInputProps = {
  label: string;
  type: string;
  name: string;
  id: string;
  onChange: Function;
};

const MediaInput = ({ onChange, id, label, name, type }: MediaInputProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="h-24 w-30 flex flex-col items-center justify-center gap-1 text-gray-700 text-center capitalize cursor-pointer"
      >
        <span className="text-2xl text-violet-800 dark:text-violet-300">
          <i className="fi fi-rr-picture"></i>
        </span>
        <p className="text-gray-800 dark:text-gray-100">{label}</p>
      </label>
      <input
        type={type}
        id={id}
        className="hidden"
        name={name}
        onChange={(ev: React.ChangeEvent) => onChange(ev)}
      />
    </>
  );
};

export default MediaInput;
