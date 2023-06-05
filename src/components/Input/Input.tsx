import React, { FC, Fragment } from "react";

import { BrokenLineBorder } from "./BrokenLineBorder";
import { InputVariations } from "./config";
import { NoBorder } from "./NoBorder";
import { Outlined } from "./Outlined";
import { Solid } from "./Solid";
import type { InputProps } from "./types";
import { Underlined } from "./Underlined";

const Input: FC<InputProps> = (props) => {
  const { variation = InputVariations.Outlined, ...rest } = props;

  const variations = {
    [InputVariations.Outlined]: <Outlined {...rest} />,
    [InputVariations.BrokenLineBorder]: <BrokenLineBorder {...rest} />,
    [InputVariations.Solid]: <Solid {...rest} />,
    [InputVariations.NoBorder]: <NoBorder {...rest} />,
    [InputVariations.Underlined]: <Underlined {...rest} />,
  };

  return variations[variation] || <Fragment />;
};

export { Input };
