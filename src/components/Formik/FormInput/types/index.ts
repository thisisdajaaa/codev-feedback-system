import type { InputProps } from "@/components/Input/types";

type OmittedKeys = "value" | "onChange" | "onBlur";

export type FormInputProps = Omit<InputProps, OmittedKeys> & {
  name: string;
  handleInputChange?: (value: string) => void;
};
