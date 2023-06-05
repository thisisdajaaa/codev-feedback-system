import React, { FC, useRef } from "react";
import InputMask from "react-input-mask";

import clsxm from "@/utils/clsxm";

import type { InputProps } from "./types";

const Base: FC<InputProps> = (props) => {
  const {
    disabled = false,
    inputClassName,
    type,
    value,
    readOnly,
    onFocus,
    mask,
    rightAdornment,
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
          mask={mask}
          type={type}
          value={value}
          disabled={disabled}
          onFocus={handleFocus}
          onWheel={handleWheel}
          readOnly={readOnly}
          className={clsxm(
            inputClassName,
            "block w-full border-transparent text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
            "placeholder-gray-500",
            disabled && "bg-disable",
            rightAdornment && "pr-12"
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
            inputClassName,
            "block w-full border-transparent text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
            "placeholder-gray-500",
            disabled && "bg-disable",
            readOnly && "cursor-default",
            rightAdornment && "pr-12"
          )}
          {...rest}
        />
      )}

      {rightAdornment && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {rightAdornment}
        </div>
      )}
    </div>
  );
};

export { Base };
