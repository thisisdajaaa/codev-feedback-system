import type { CheckboxProps } from "@/components/Checkbox/types";

export type FormCheckboxProps = {
  name: string;
  handleCheckedChange?: (checked: boolean) => void;
} & CheckboxProps;
