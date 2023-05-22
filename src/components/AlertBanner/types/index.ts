export type AlertTypes = "success" | "error" | "warning" | "info";

export type AlertProps = {
  type?: AlertTypes;
  message: string;
  open: boolean;
  handleClose: () => void;
};
