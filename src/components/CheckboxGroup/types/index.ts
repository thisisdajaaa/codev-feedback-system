import { ReactNode } from "react";

export type Option = {
  label: string | ReactNode;
  value: string;
};

export type CheckboxGroupProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange: (option: Option[]) => void;
  errorMessage?: string;
  className?: string;
  itemClassName?: string;
};
