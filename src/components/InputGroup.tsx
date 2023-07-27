import { ReactNode } from "react";

type Props = {
  dir: "col" | "row";
  children: ReactNode | ReactNode[];
  width: string | number;
  extraClassName?: string;
};
function InputGroup({ dir, children, width, extraClassName }: Props) {
  return (
    <span
      className={`flex flex-${dir ?? "col"} ${extraClassName}`}
      style={{ width: width ?? "75%" }}
    >
      {children}
    </span>
  );
}

export default InputGroup;
