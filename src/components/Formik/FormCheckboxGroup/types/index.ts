import type {
  CheckboxGroupProps,
  Option,
} from "@/components/CheckboxGroup/types";

type OmittedKeys = "selectedOption" | "onChange";

export type FormCheckboxGroupProps = Omit<CheckboxGroupProps, OmittedKeys> & {
  name: string;
  handleCheckboxGroupChange?: (option: Option[]) => void;
};
