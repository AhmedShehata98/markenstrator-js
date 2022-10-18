import React from "react";

type InputWrapperProps = {
  extraClassName: string;
  style?: React.CSSProperties;
  children: React.ReactNode | React.ReactNode[];
};
const InputWrapper = ({
  extraClassName,
  style,
  children,
}: InputWrapperProps) => {
  return (
    <div className={`input-wrapper ${extraClassName}`} style={style}>
      {children}
    </div>
  );
};

export default InputWrapper;
