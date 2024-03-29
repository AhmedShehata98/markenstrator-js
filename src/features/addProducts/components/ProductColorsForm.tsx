import { useCallback, useEffect, useRef, useState } from "react";
import InputGroup from "../../../components/InputGroup";
import { MdOutlineAdd } from "react-icons/md";
import { ProductForm } from "../../../../types";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { BsFillTrashFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useLocation } from "react-router-dom";

type Props = {
  setValue: UseFormSetValue<ProductForm>;
  register: UseFormRegister<ProductForm>;
  watch: UseFormWatch<ProductForm>;
};
function ProductColorsForm({ setValue, watch, register }: Props) {
  const colorsElement = useRef<HTMLInputElement | null>(null);
  const isAppliedIncomingData = useRef<boolean>(false);
  const [colorsList, setColorsList] = useState<string[]>([]);
  const { state } = useLocation();
  const handleAddToFormValues = () => {
    setValue("colors", colorsList);
    return colorsList;
  };

  const isDublicated = (currentColor: string | undefined) =>
    colorsList.some((prevColor) => prevColor === currentColor);

  const handleSetIncomingColors = useCallback(() => {
    if (state) {
      const incomingColorList = watch("colors");
      if (state?.isUpdateProduct)
        setColorsList((prev) => [...prev, ...incomingColorList]);
      isAppliedIncomingData.current = true;
    }
  }, [state]);

  const handleAddToColorsList = () => {
    const currentColor = colorsElement.current?.value;
    const isExist = isDublicated(currentColor);
    if (!isExist && currentColor) {
      setColorsList((prev) => [...prev, currentColor]);
      handleAddToFormValues();
    }
  };

  const handleRemoveFromColorsList = (color: string) => {
    const newColorList = colorsList.filter((prevColor) => prevColor !== color);
    setColorsList(newColorList);
    handleAddToFormValues();
  };

  useEffect(() => {
    const incomingColorList = watch("colors");
    if (
      state &&
      Array.isArray(incomingColorList) &&
      !isAppliedIncomingData.current
    ) {
      handleSetIncomingColors();
    }
  }, [state, watch("colors")]);

  return (
    <div>
      <InputGroup
        dir="row"
        width={"100%"}
        extraClassName="justify-between mt-3"
      >
        <label htmlFor="colors" className="form-label">
          select color
        </label>
        <input
          ref={colorsElement}
          type="color"
          name="color-select"
          id="colors"
          width={600}
        />
      </InputGroup>
      <InputGroup dir="row" width={"100%"}>
        <button
          type="button"
          className="submit-btn mt-2"
          onClick={handleAddToColorsList}
        >
          add to list
        </button>
      </InputGroup>
      <InputGroup dir="col" width={"100%"}>
        <h4>colors List :</h4>
        <ul>
          {colorsList?.map((color, index) => (
            <span
              key={index}
              className="w-max flex items-center justify-center gap-4 border shadow-md bg-gray-50 px-3 py-1 "
            >
              <RxDotFilled />
              <label
                htmlFor={color as string}
                className="form-label w-16 h-5 inline-block rounded-xl border border-gray-500"
                style={{ backgroundColor: color as string }}
              ></label>
              <button
                type="button"
                className="bg-red-300 p-1.5 text-red-700 hover:bg-red-400"
                onClick={() => handleRemoveFromColorsList(color as string)}
              >
                <BsFillTrashFill />
              </button>
            </span>
          ))}
        </ul>
      </InputGroup>
    </div>
  );
}

export default ProductColorsForm;
