import type { ApiResponse } from "@/types";

import type { SurveyByIdResponse } from "@/features/survey/types";

export type Questions = {
  isRequired: boolean;
  question: string;
  type: string;
};

type Duration = {
  startDate: Date;
  endDate: Date;
};

export type SurveyQuestions = {
  title: string;
  description: string;
  duration: Duration;
  questions: Questions[];
};

export type SurveyProps = {
  items: ApiResponse<SurveyByIdResponse>;
};

export type SurveyQuestionnaireForm = SurveyByIdResponse;

export type OverviewProps = {
  data: SurveyByIdResponse;
};

export type QuestionProps = {
  index: number;
};
