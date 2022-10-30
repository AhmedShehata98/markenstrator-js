import React, { forwardRef, LegacyRef } from "react";
import { RegisterOptions } from "react-hook-form";

interface TogglerSwitchBtnProps {
  htmlFor: string;
  name: string;
  id: string;
  onChange: React.ChangeEventHandler;
  onBlur: React.FocusEventHandler;
  ref: React.LegacyRef<HTMLInputElement> | undefined;
}

const TogglerSwitchBtn = forwardRef(
  (
    { htmlFor, id, name, onBlur, onChange }: Partial<TogglerSwitchBtnProps>,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <label
        htmlFor={htmlFor}
        className="flex items-center cursor-pointer relative"
      >
        <input
          className="sr-only"
          ref={ref}
          type="checkbox"
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full dark:bg-zinc-400 dark:border-zinc-500"></div>
        <span className="ml-3 text-gray-900 text-sm font-medium"></span>
      </label>
    );
  }
);

export default TogglerSwitchBtn;
