import type { Option } from "@/components/CheckboxGroup/types";

export type QuestionnaireForm = {
  id: string;
  title: string;
  description: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  questions: Question[];
};

export type Question = {
  title: string;
  type: Option | null;
  options?: Option[];
  isRequired?: boolean;
};

export type QuestionProps = {
  index: number;
};
