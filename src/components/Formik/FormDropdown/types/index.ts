import type { DropdownProps, Option } from "@/components/Dropdown/types";

type OmittedKeys = "selectedOption" | "onChange" | "onBlur" | "onFocus";

export type FormDropdownProps = Omit<DropdownProps, OmittedKeys> & {
  name: string;
  handleDropdownChange?: (option: Option | Option[]) => void | Promise<void>;
};
