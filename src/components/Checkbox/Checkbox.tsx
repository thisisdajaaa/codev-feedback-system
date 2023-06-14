import React, { FC } from "react";

import clsxm from "@/utils/clsxm";

import type { CheckboxProps } from "./types";
import { Typography } from "../Typography";

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    label,
    checked,
    name,
    readOnly,
    containerClassName,
    labelClassName,
    ...rest
  } = props;

  return (
    <label
      htmlFor={name}
      className={clsxm(
        "flex cursor-pointer items-center gap-[1.563rem]",
        containerClassName
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={readOnly}
        className="form-checkbox h-5 w-5 text-gray-600"
        {...rest}
      />

      <Typography variant="span" size="text-base" className={labelClassName}>
        {label}
      </Typography>
    </label>
  );
};

export { Checkbox };
