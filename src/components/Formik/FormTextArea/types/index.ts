import type { TextAreaProps } from "@/components/TextArea/types";

type OmittedKeys = "value" | "onChange" | "onBlur";

export type FormTextAreaProps = Omit<TextAreaProps, OmittedKeys> & {
  name: string;
  handleInputChange?: (value: string) => void;
};
