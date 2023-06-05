import type { Option, RadioGroupProps } from "@/components/RadioGroup/types";

type OmittedKeys = "selectedOption" | "onChange";

export type FormRadioGroupProps = Omit<RadioGroupProps, OmittedKeys> & {
  name: string;
  handleRadioGroupChange?: (option: Option) => void;
};
