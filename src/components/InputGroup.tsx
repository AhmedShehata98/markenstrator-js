import { ReactNode } from "react";

type Props = {
  dir: "col" | "row";
  children: ReactNode[];
  width: string | number;
};
function InputGroup({ dir, children, width }: Props) {
  return (
    <span
      className={`flex flex-${dir ?? "col"}`}
      style={{ width: width ?? "75%" }}
    >
      {children}
    </span>
  );
}

export default InputGroup;
