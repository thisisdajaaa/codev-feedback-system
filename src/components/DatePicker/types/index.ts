export type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  errorMessage?: string;
};
