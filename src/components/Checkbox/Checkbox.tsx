import React, { FC } from "react";

import type { CheckboxProps } from "./types";
import { Typography } from "../Typography";

const Checkbox: FC<CheckboxProps> = (props) => {
  const { label, checked, name, readOnly, ...rest } = props;

  return (
    <label
      htmlFor={name}
      className="flex cursor-pointer items-center gap-[1.563rem]"
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={readOnly}
        className="form-checkbox h-5 w-5 text-gray-600"
        {...rest}
      />

      <Typography variant="span" size="text-base">
        {label}
      </Typography>
    </label>
  );
};

export { Checkbox };
