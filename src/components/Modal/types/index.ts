import { ReactNode } from "react";

export type ModalSizes = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  open: boolean;
  title: string | ReactNode;
  size?: ModalSizes;
  handleClose: () => void;
};
