import type { Option } from "@/components/CheckboxGroup/types";

export type QuestionnaireForm = {
  title: string;
  description: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  questions: Question[];
};

export type Question = {
  title: string;
  type: string | null;
  options?: Option[];
  isRequired?: boolean;
};

export type QuestionProps = {
  index: number;
};
