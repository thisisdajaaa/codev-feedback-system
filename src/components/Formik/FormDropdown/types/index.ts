import type { DropdownProps, Option } from "@/components/Dropdown/types";

type OmittedKeys = "selectedOption" | "onChange" | "onBlur" | "onFocus";

export type FormDropdownProps = Omit<DropdownProps, OmittedKeys> & {
  name: string;
  onChange?: (option: Option | Option[]) => void;
};
