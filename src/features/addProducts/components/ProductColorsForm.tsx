import { useRef, useState } from "react";
import InputGroup from "../../../components/InputGroup";
import { MdOutlineAdd } from "react-icons/md";

function ProductColorsForm() {
  const colorElementRef = useRef<HTMLInputElement | null>(null);
  const [colors, setColors] = useState([
    {
      color: "#891a1a",
      isSelected: true,
    },
  ]);

  // const handleGetColor = (ev: React.ChangeEvent<HTMLInputElement>) => {
  //   const color = ev.target.value;

  // };

  const handleAddColor = () => {
    const selectedColor = colorElementRef.current?.value as string;
    setColors((prevColor) => [
      ...prevColor,
      { color: selectedColor, isSelected: true },
    ]);
  };

  const handleSelectColor = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const targetColor = ev.currentTarget.value;
    const newColors = colors.map((item) =>
      item.color === targetColor
        ? { ...item, isSelected: !item.isSelected }
        : { ...item }
    );
    setColors(newColors);
  };

  return (
    <InputGroup dir="col" width={"100%"}>
      <span className="w-max flex items-center justify-center gap-2 my-2">
        <label htmlFor="colors" className="form-label">
          colors
        </label>
        <input ref={colorElementRef} type="color" name="colorsa" width={600} />
        <button
          type="button"
          className="flex items-center justify-center bg-violet-600 text-white px-4 py-1 rounded-full "
          onClick={handleAddColor}
        >
          <MdOutlineAdd />
          <p>add</p>
        </button>
      </span>
      <hr />
      <span className="flex items-center justify-start flex-col gap-3 self-start mt-3">
        <p className="font-medium capitalize text-gray-600 text-sm self-start">
          slected colors list :
        </p>
        <ul className="max-w-full h-8 flex flex-wrap gap-4 self-start">
          {colors &&
            colors.map(({ color, isSelected }) => (
              <li
                key={color}
                className="flex items-center justify-center gap-3"
              >
                <input
                  type="checkbox"
                  name="colors-list"
                  id={`color-${color}`}
                  checked={isSelected}
                  value={color}
                  onChange={handleSelectColor}
                />
                <label
                  htmlFor={`color-${color}`}
                  className="flex items-center justify-center text-sm capitalize gap-2"
                >
                  <p>color : </p>
                  <span
                    className="w-10 h-5 rounded-md shadow-lg"
                    style={{ background: color }}
                  ></span>
                </label>
              </li>
            ))}
        </ul>
      </span>
    </InputGroup>
  );
}

export default ProductColorsForm;
