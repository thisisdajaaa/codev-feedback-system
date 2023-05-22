import React, { FC, useRef } from "react";
import InputMask from "react-input-mask";

import clsxm from "@/utils/clsxm";

import type { InputProps } from "./types";
import { Typography } from "../Typography";

const Input: FC<InputProps> = (props) => {
  const {
    disabled = false,
    hasError = false,
    errorMessage,
    className,
    type,
    value,
    readOnly,
    onFocus,
    mask,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (readOnly) inputRef.current?.blur();

    if (onFocus) onFocus(event);
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") event.currentTarget.blur();
  };

  if (type === "hidden") {
    return (
      <input
        ref={inputRef}
        type={type}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onFocus={handleFocus}
        onWheel={handleWheel}
        className={clsxm(
          className,
          "w-full placeholder-gray-500",
          disabled ? "bg-disable" : "",
          readOnly && "cursor-default"
        )}
        {...rest}
      />
    );
  }

  return (
    <>
      <div
        className={clsxm(
          "flex w-full flex-grow appearance-none items-center",
          "rounded-[0.25rem] border py-1 text-black",
          "duration-150 focus-within:border-nero focus-within:transition-all sm:text-sm",
          hasError && "border-red-400",
          disabled && "bg-disable"
        )}
      >
        {mask ? (
          <InputMask
            mask={mask}
            type={type}
            value={value}
            disabled={disabled}
            onFocus={handleFocus}
            onWheel={handleWheel}
            readOnly={readOnly}
            className={clsxm(
              "block w-full border-transparent px-[0.875rem] py-2 text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
              "placeholder-gray-500",
              disabled && "bg-disable"
            )}
            {...rest}
          />
        ) : (
          <input
            type={type}
            value={value}
            disabled={disabled}
            onFocus={handleFocus}
            readOnly={readOnly}
            onWheel={handleWheel}
            className={clsxm(
              className,
              "block w-full border-transparent px-[0.875rem] py-2 text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
              "placeholder-gray-500",
              disabled && "bg-disable",
              readOnly && "cursor-default"
            )}
            {...rest}
          />
        )}
      </div>

      {hasError && (
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

export { Input };
