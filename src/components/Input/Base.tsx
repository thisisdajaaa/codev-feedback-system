import React, { forwardRef, useRef } from "react";
import InputMask from "react-input-mask";

import clsxm from "@/utils/clsxm";

import type { InputProps } from "./types";

const Base = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled = false,
    inputClassName,
    type,
    value,
    readOnly,
    onFocus,
    mask,
    rightAdornment,
    containerClassName: _containerClassName,
    errorMessage: _errorMessage,
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

  return (
    <div className="relative block w-full">
      {mask ? (
        <InputMask
          inputRef={ref}
          mask={mask}
          type={type}
          value={value}
          disabled={disabled}
          onFocus={onFocus}
          onWheel={handleWheel}
          readOnly={readOnly}
          className={clsxm(
            inputClassName,
            "block w-full border-transparent text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
            "placeholder-gray-500",
            disabled && "bg-disable",
            rightAdornment && "pr-8 md:pr-12"
          )}
          {...rest}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          value={value}
          disabled={disabled}
          onFocus={handleFocus}
          readOnly={readOnly}
          onWheel={handleWheel}
          className={clsxm(
            "block w-full border-transparent text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
            "placeholder-gray-500",
            inputClassName,
            disabled && "bg-disable",
            readOnly && "cursor-default",
            rightAdornment && "pr-8 md:pr-12"
          )}
          {...rest}
        />
      )}

      {rightAdornment && (
        <div className="pointer-events-none absolute inset-y-0 -right-3 flex items-center pr-1 sm:right-0">
          {rightAdornment}
        </div>
      )}
    </div>
  );
});

export { Base };
