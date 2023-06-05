import { ReactNode } from "react";

export type Option = {
  label: string | ReactNode;
  value: string;
};

export type RadioGroupProps = {
  options: Option[];
  selectedOption: Option | null;
  onChange: (option: Option) => void;
  errorMessage?: string;
  className?: string;
  itemClassName?: string;
};
