import React, { FC, useEffect, useState } from "react";

import clsxm from "@/utils/clsxm";

import type { CheckboxGroupProps, Option } from "./types";
import { Typography } from "../Typography";

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  selectedOptions: selectedOptionsProp,
  onChange,
  errorMessage,
  className,
  itemClassName,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    selectedOptionsProp || []
  );

  useEffect(() => {
    setSelectedOptions(selectedOptionsProp || []);
  }, [selectedOptionsProp]);

  const handleChange = (option: Option) => {
    let newSelectedOptions;

    if (selectedOptions.some((opt) => opt.value === option.value)) {
      newSelectedOptions = selectedOptions.filter(
        (opt) => opt.value !== option.value
      );
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  return (
    <>
      <div className={clsxm("flex flex-col gap-[1.188rem]", className)}>
        {options.map((option, index) => (
          <label
            key={index}
            className={clsxm(
              "mb-3 inline-flex items-center md:mb-0",
              itemClassName
            )}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.some(
                (opt) => opt.value === option.value
              )}
              onChange={() => handleChange(option)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />

            <span className="ml-[1.563rem] text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

      {!!errorMessage && (
        <Typography
          variant="p"
          size="text-sm"
          lineHeight="leading-[1.063rem]"
          textAlign="text-left"
          color="text-red-400"
          className="mt-[0.5rem] font-light"
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export { CheckboxGroup };
