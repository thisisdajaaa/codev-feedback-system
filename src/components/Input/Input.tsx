import React, { forwardRef, Fragment } from "react";

import { BrokenLineBorder } from "./BrokenLineBorder";
import { InputVariations } from "./config";
import { NoBorder } from "./NoBorder";
import { Outlined } from "./Outlined";
import { Solid } from "./Solid";
import type { InputProps } from "./types";
import { Underlined } from "./Underlined";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variation = InputVariations.Outlined, ...rest } = props;

  const variations = {
    [InputVariations.Outlined]: <Outlined ref={ref} {...rest} />,
    [InputVariations.BrokenLineBorder]: (
      <BrokenLineBorder ref={ref} {...rest} />
    ),
    [InputVariations.Solid]: <Solid ref={ref} {...rest} />,
    [InputVariations.NoBorder]: <NoBorder ref={ref} {...rest} />,
    [InputVariations.Underlined]: <Underlined ref={ref} {...rest} />,
  };

  return variations[variation] || <Fragment />;
});

export { Input };
