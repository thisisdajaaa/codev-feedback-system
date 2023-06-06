import React, { FC } from "react";

import clsxm from "@/utils/clsxm";

import type { RadioGroupProps } from "./types";
import { Typography } from "../Typography";

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    options,
    selectedOption,
    onChange,
    errorMessage,
    className,
    itemClassName,
    readOnly,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = options.find(
      (option) => option.value === event.target.value
    );

    if (selected) onChange(selected);
  };

  const isColumnLayout = options.length > 5;

  return (
    <>
      <div
        className={clsxm(
          "flex flex-col md:flex-row md:justify-between",
          className,
          isColumnLayout && "md:flex-col"
        )}>
        {options.map((option, index) => (
          <label
            key={index}
            className={clsxm(
              "mb-3 inline-flex items-center md:mb-0 md:flex-col",
              isColumnLayout &&
                "mt-3 flex-row items-start gap-[25px] md:flex-row",
              itemClassName
            )}>
            <input
              type="radio"
              value={option.value}
              checked={Boolean(
                selectedOption && selectedOption.value === option.value
              )}
              disabled={readOnly}
              onChange={handleChange}
              className="form-radio h-5 w-5 text-gray-600"
            />

            <span className="ml-[25px] text-gray-700 md:ml-0">
              {option.label}
            </span>
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
          className="mt-[0.5rem] font-light">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export { RadioGroup };
