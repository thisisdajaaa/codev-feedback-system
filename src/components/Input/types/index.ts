import { InputHTMLAttributes, ReactNode } from "react";

import { InputVariations } from "../config";

export type BaseInputVariations = keyof typeof InputVariations;

export type VariationInputProps = {
  label?: string;
  errorMessage?: string;
  mask?: string;
  inputClassName?: string;
  containerClassName?: string;
  rightAdornment?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export type InputProps = {
  variation?: BaseInputVariations;
} & VariationInputProps;
