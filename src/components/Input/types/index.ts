import { InputHTMLAttributes } from "react";

export type InputProps = {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  mask?: string;
} & InputHTMLAttributes<HTMLInputElement>;
