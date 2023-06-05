export type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  onBlur?: () => void;
  errorMessage?: string;
};
