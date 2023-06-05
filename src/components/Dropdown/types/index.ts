import { ReactNode } from "react";

export type Option = {
  value: string;
  label: string | ReactNode;
};

export type GroupOption = {
  group: string;
  options: Option[];
};

export type DropdownProps = {
  options: (Option | GroupOption)[];
  selectedOption: Option | Option[] | null;
  placeholder: string;
  errorMessage?: string;
  onChange: (selected: Option[] | Option) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  multiSelect?: boolean;
  className?: string;
};
