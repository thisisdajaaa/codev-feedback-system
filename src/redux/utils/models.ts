import type { ModalProps } from "@/components/Modal/types";

export type ToastType = "default" | "success" | "error";

export type Toast = ModalProps & {
  timeout?: number;
  message: string;
  type: ToastType;
};

export type UtilsState = {
  toast: Toast;
};
