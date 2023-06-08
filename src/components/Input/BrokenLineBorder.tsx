import React, { forwardRef } from "react";

import clsxm from "@/utils/clsxm";

import { Base } from "./Base";
import type { InputProps } from "./types";
import { Typography } from "../Typography";

const BrokenLineBorder = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { disabled = false, errorMessage, containerClassName } = props;

    return (
      <>
        <div
          className={clsxm(
            "flex w-full flex-grow appearance-none items-center px-[0.875rem] py-2",
            "max-h-[2.5rem] border-b border-dotted border-b-nero bg-gray-100 text-black",
            "duration-150 focus-within:border-nero focus-within:transition-all sm:text-sm",
            !!errorMessage && "border-red-400",
            disabled && "bg-disable",
            containerClassName
          )}
        >
          <Base ref={ref} inputClassName="bg-transparent" {...props} />
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
  }
);

export { BrokenLineBorder };
