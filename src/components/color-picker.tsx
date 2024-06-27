import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "../utils/stying";

const colors = [
  { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
  {
    name: "Heather Grey",
    bgColor: "bg-gray-400",
    selectedColor: "ring-gray-400",
  },
];

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900">Color</h2>

      <fieldset aria-label="Choose a color" className="mt-2">
        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="flex items-center space-x-3"
        >
          {colors.map((color) => (
            <Radio
              key={color.name}
              value={color}
              aria-label={color.name}
              className={({ focus, checked }) =>
                classNames(
                  color.selectedColor,
                  focus && checked ? "ring ring-offset-1" : "",
                  !focus && checked ? "ring-2" : "",
                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                )
              }
            >
              <span
                aria-hidden="true"
                className={classNames(
                  color.bgColor,
                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                )}
              />
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
