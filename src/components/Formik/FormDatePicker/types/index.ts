import type { DatePickerProps } from "@/components/DatePicker/types";

type OmittedKeys = "selectedDate" | "onChange";

export type FormDatePickerProps = Omit<DatePickerProps, OmittedKeys> & {
  name: string;
  handleDateChange?: (value: Date) => void;
};
