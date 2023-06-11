import { InputHTMLAttributes } from "react";

export type CheckboxProps = {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;
