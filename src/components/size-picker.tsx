import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "../utils/stying";

const sizes = [
  { name: "XXS", inStock: true },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: false },
];

export function SizePicker() {
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Size</h2>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          See sizing chart
        </a>
      </div>

      <fieldset aria-label="Choose a size" className="mt-2">
        <RadioGroup
          value={selectedSize}
          onChange={setSelectedSize}
          className="grid grid-cols-3 gap-3 sm:grid-cols-6"
        >
          {sizes.map((size) => (
            <Radio
              key={size.name}
              value={size}
              className={({ focus, checked }) =>
                classNames(
                  size.inStock
                    ? "cursor-pointer focus:outline-none"
                    : "cursor-not-allowed opacity-25",
                  focus ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                  checked
                    ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                  "flex items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase sm:flex-1"
                )
              }
              disabled={!size.inStock}
            >
              {size.name}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
