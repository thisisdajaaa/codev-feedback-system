import type { ReactNode } from "react";

export type AlertTypes = "success" | "error" | "warning" | "info";

export type AlertProps = {
  type?: AlertTypes;
  message: string | ReactNode;
  open: boolean;
  handleClose: () => void;
  className?: string;
};
