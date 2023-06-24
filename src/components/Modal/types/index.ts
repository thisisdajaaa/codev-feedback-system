import { ReactNode } from "react";

export type ModalSizes = "xs" | "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  open: boolean;
  title?: string | ReactNode;
  size?: ModalSizes;
  className?: string;
  scrollable?: boolean;
  handleClose?: () => void;
  contentClassName?: string;
};

export type DeleteModalProps = {
  open: boolean;
  handleClose?: () => void;
  handleDelete?: () => void;
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
};
