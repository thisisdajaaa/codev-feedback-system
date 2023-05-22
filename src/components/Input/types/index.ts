import { InputHTMLAttributes } from "react";

export type InputProps = {
  label?: string;
  errorMessage?: string;
  mask?: string;
} & InputHTMLAttributes<HTMLInputElement>;
