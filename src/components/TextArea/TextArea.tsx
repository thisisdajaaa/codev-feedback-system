import React, { FC, useRef } from "react";

import clsxm from "@/utils/clsxm";

import type { TextAreaProps } from "./types";

const TextArea: FC<TextAreaProps> = (props) => {
  const {
    disabled = false,
    value,
    readOnly,
    onFocus,
    className,
    ...rest
  } = props;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    if (readOnly) inputRef.current?.blur();

    if (onFocus) onFocus(event);
  };

  return (
    <textarea
      value={value}
      disabled={disabled}
      onFocus={handleFocus}
      readOnly={readOnly}
      className={clsxm(
        className,
        "block w-full rounded-[10px] border-transparent bg-gray-100 text-base leading-[1.813rem] text-black focus:border-transparent focus:outline-none focus:ring-0",
        "placeholder-gray-500",
        disabled && "bg-disable",
        readOnly && "cursor-default"
      )}
      {...rest}
    />
  );
};

export { TextArea };
