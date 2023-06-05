import { TextareaHTMLAttributes } from "react";

export type TextAreaProps = {
  errorMessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
