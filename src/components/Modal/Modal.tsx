import clsx, { ClassValue } from "clsx";
import React, { FC, PropsWithChildren, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import type { ModalProps } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const { open, handleClose, title, size = "sm", children } = props;

  const [scaleClass, setScaleClass] = useState<string>(
    open ? "scale-100" : "scale-0"
  );

  useUpdateEffect(() => {
    setScaleClass(open ? "scale-100" : "scale-0");
  }, [open]);

  const sizes: ClassValue[] = [
    size === "sm" && ["w-1/2"],
    size === "md" && ["w-2/3"],
    size === "lg" && ["w-3/4"],
    size === "xl" && ["w-[85%]"],
  ];

  return (
    <div>
      {open && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
          <div
            className={clsx(
              "flex max-h-[90vh] transform flex-col rounded-lg bg-white transition-all duration-300 ease-out",
              scaleClass,
              sizes
            )}
          >
            <div className="flex flex-shrink-0 items-center justify-between py-[0.688rem] px-[1.375rem]">
              {typeof title === "string" ? (
                <Typography preset="heading2">{title}</Typography>
              ) : (
                title
              )}

              <button className="ml-auto text-lg" onClick={handleClose}>
                <Icon src="/assets/close.svg" height={12} width={12} />
              </button>
            </div>

            <div className="modal-scrollbar flex-grow overflow-y-auto px-[1.375rem] py-[1.813rem]">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Modal };
