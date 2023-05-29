import type { NextApiRequest } from "next";

import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import type { IQuestion } from "@/models/Template/types";

import type { ApiResponse } from "@/types";

import type { PickedTemplate } from "@/features/questionnaire/types";

export type PickedSurveyDetails =
  | "templateId"
  | "surveyAnswers"
  | "dateSubmitted";

export type AnsweredByUser = {
  id: string;
  email: string;
  name: string;
};

export type PickedSurvey = Pick<ISurvey, PickedSurveyDetails> & {
  answeredBy: AnsweredByUser;
};

export type CreatedSurveyResponse = {
  survey: PickedSurvey & { id: string };
};

export type SingleSurveyResponse = PickedSurvey &
  PickedTemplate & {
    id: string;
    createdAt: string;
    updatedAt: string;
    isAnonymous: boolean;
    status: string;
    templateId: string;
  };

export type SurveysResponse = SingleSurveyResponse[];

export type GetSurveysResponse = Omit<ApiResponse<SurveysResponse>, "success">;

export interface IViewSurveAnswer
  extends Pick<IQuestion, "title" | "type" | "options" | "isRequired">,
    Pick<ISurveyAnswer, "questionId" | "answer" | "comment"> {}
export interface IGetSurveyResponse
  extends Pick<ISurvey, "templateId" | "answeredBy"> {
  surveyAnswers: IViewSurveAnswer[];
}

export interface IAnswerSurveyRequest extends NextApiRequest {
  body: {
    questionId: string;
    answer: string;
    comment?: string;
  };
}

export interface IGetSurveyRequest extends NextApiRequest {
  body: {
    coverageId: string;
    userId: string;
    title: string;
  };
}
