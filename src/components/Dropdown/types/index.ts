export type Option = {
  value: string;
  label: string;
};

export type DropdownProps = {
  options: Option[];
  selectedOption: Option | Option[] | null;
  placeholder: string;
  errorMessage?: string;
  onChange: (selected: Option[] | Option) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  multiSelect?: boolean;
};
