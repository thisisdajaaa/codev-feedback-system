import type { Option } from "@/components/CheckboxGroup/types";

import { SurveyStatus } from "@/models/Survey/config";

import type { ApiResponse } from "@/types";

import type { CreatedQuestionnaireResponse } from "@/features/questionnaire/types";

export type QuestionnaireForm = {
  id: string;
  title: string;
  description: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  questions: Question[];
  status?: keyof typeof SurveyStatus;
};

export type Question = {
  id?: string;
  title: string;
  type: Option | null;
  options?: Option[] | null;
  isRequired?: boolean;
};

export type QuestionProps = {
  index: number;
  handleDeleteQuestion: (questionId: string, index: number) => Promise<boolean>;
};

export type QuestionnaireProps = {
  items: ApiResponse<CreatedQuestionnaireResponse>;
};
