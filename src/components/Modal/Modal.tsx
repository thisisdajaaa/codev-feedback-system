import clsx, { ClassValue } from "clsx";
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";

import clsxm from "@/utils/clsxm";
import { useOnClickOutsideElement, useUpdateEffect } from "@/hooks";

import type { ModalProps } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    open,
    handleClose,
    title,
    className,
    size = "sm",
    scrollable = true,
    contentClassName,
    children,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const [scaleClass, setScaleClass] = useState<string>(
    open ? "scale-100" : "scale-0"
  );

  useUpdateEffect(() => {
    setScaleClass(open ? "scale-100" : "scale-0");
  }, [open]);

  const handleClickOutside = useCallback(() => {
    if (handleClose) handleClose();
  }, [handleClose]);

  useOnClickOutsideElement(ref, handleClickOutside);

  const sizes: ClassValue[] = [
    size === "xs" && ["xl:w-1/3 md:w-1/2 w-full"],
    size === "sm" && ["md:w-1/2 w-full"],
    size === "md" && ["md:w-2/3 w-full"],
    size === "lg" && ["md:w-3/4 w-full"],
    size === "xl" && ["md:w-[85%] w-full"],
  ];

  return (
    <div>
      {open && (
        <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black/50">
          <div
            ref={ref}
            className={clsx(
              "w-1/ flex max-h-[90vh] transform flex-col rounded-3xl bg-white transition-all duration-300 ease-out",
              scaleClass,
              sizes,
              className
            )}
          >
            <div className="flex flex-shrink-0 items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-[1.375rem] pt-4 pb-[0.688rem]">
              {typeof title === "string" ? (
                <Typography preset="heading2">{title}</Typography>
              ) : (
                title
              )}

              <button className="ml-auto text-lg" onClick={handleClose}>
                <Icon src="/assets/close.svg" />
              </button>
            </div>

            <div
              className={clsxm(
                "modal-scrollbar flex-grow px-[1.375rem] py-[1.813rem]",
                scrollable && "overflow-y-auto",
                contentClassName
              )}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Modal };
