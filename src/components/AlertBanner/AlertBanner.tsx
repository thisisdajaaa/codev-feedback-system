import clsx from "clsx";
import React, { FC } from "react";

import type { AlertProps } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const AlertBanner: FC<AlertProps> = (props) => {
  const { type = "success", message, handleClose, open } = props;

  const colorScheme = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-white text-nero",
  };

  if (!open) return null;

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center rounded-md p-4 shadow-md",
        colorScheme[type]
      )}
    >
      <div className="mr-5 flex items-center gap-3 break-words">
        <Typography preset="regular">{message}</Typography>
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform text-lg"
        onClick={handleClose}
      >
        <Icon src="/assets/close.svg" height={12} width={12} />
      </button>
    </div>
  );
};

export { AlertBanner };
