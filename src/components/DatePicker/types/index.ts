export type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  errorMessage?: string;
};
