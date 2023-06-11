import type { RatingProps } from "@/components/Rating/types";

type OmittedKeys = "value" | "onChange";

export type FormRatingProps = Omit<RatingProps, OmittedKeys> & {
  name: string;
  handleRatingChange?: (value: number) => void;
};
