import type { ClassValue } from "clsx";
import React, { forwardRef } from "react";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/utils/clsxm";

import type { ButtonProps } from "./types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    disabled: isButtonDisabled,
    isLoading,
    variant = "primary",
    ...rest
  } = props;

  const disabled = isLoading || isButtonDisabled;

  const variants: ClassValue[] = [
    variant === "primary" && [
      "bg-blue-500 text-white",
      "border-blue-600 border",
      "hover:bg-blue-600 hover:text-white",
      "active:bg-blue-500",
      "disabled:bg-blue-400 disabled:hover:bg-blue-400",
    ],
    variant === "warning" && [
      "bg-red-500 text-white",
      "border-red-600 border",
      "hover:bg-red-600 hover:text-white",
      "active:bg-red-500",
      "disabled:bg-red-400 disabled:hover:bg-red-400",
    ],
  ];

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={clsxm(
        "font-secondary inline-flex items-center gap-[0.531rem] rounded-full px-[0.7rem] py-2 font-semibold sm:px-4",
        "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
        "shadow-sm",
        "transition-all duration-75",
        variants,
        "disabled:cursor-not-allowed",
        isLoading &&
          "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
        className
      )}
      {...rest}
    >
      {isLoading && (
        <div
          data-testid="loading-icon"
          className={clsxm(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          )}
        >
          <ImSpinner2 className="animate-spin" />
        </div>
      )}

      {children}
    </button>
  );
});

export { Button };
