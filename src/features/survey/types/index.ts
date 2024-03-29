import type { NextApiRequest } from "next";

import type { Option } from "@/components/RadioGroup/types";

import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import type { IQuestion } from "@/models/Template/types";

import type { ApiResponse } from "@/types";

import type { PickedTemplate } from "@/features/questionnaire/types";

export type PickedSurveyDetails =
  | "templateId"
  | "surveyAnswers"
  | "dateSubmitted";

export type AnsweredByUser = {
  id?: string;
  email: string;
  name: string;
};

export type PickedSurvey = Pick<ISurvey, PickedSurveyDetails> & {
  answeredBy: AnsweredByUser;
};

export type CreatedSurveyResponse = {
  survey: PickedSurvey & { id: string };
};

export type SingleSurveyResponse = PickedSurvey & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  status: string;
  templateId: PickedTemplate;
};

export type SurveysResponse = SingleSurveyResponse[];

export type GetSurveysResponse = Omit<ApiResponse<SurveysResponse>, "success">;

export type PickedSurveyAnswers = Pick<ISurveyAnswer, "title" | "answer">;

export type SurveyDetailsByUserResponse = {
  answeredBy: AnsweredByUser;
  createdAt: string;
  isAnonymous: boolean;
  surveyAnswers: PickedSurveyAnswers[];
};

export type QuestionAnalyticsData = {
  value: string;
  answers: string;
};

export type SingleAnalyticsResponse = {
  questionName: string;
  responses: QuestionAnalyticsData[];
};

export type AnalyticsResponse = SingleAnalyticsResponse[];

export interface IViewSurveAnswer
  extends Pick<IQuestion, "title" | "type" | "options" | "isRequired">,
    Pick<ISurveyAnswer, "questionId" | "answer" | "comment"> {}

export interface IGetSurveyResponse
  extends Pick<ISurvey, "templateId" | "answeredBy"> {
  surveyAnswers: IViewSurveAnswer[];
}

export interface ICreateSurveyRequest extends NextApiRequest {
  body: {
    templateId: string;
    isAnonymous?: boolean;
  };
}

export interface IAnswerSurveyRequest extends NextApiRequest {
  body: {
    templateId: string;
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

export type TemplateQuestion = {
  title: string;
  type: string;
  options: string;
  isRequired: boolean;
};

export type AnalyticsQuestion = {
  questionId: string;
  answer: string;
  comment?: string;
};

export type SurveyByIdQuestion = {
  title: string;
  type: string;
  isRequired: boolean;
  answer: string | number | Option;
  comment: string;
  id: string;
};

export type SurveyByIdResponse = {
  templateId: string;
  title: string;
  description: string;
  isAnonymous: boolean;
  dateFrom: string;
  dateTo: string;
  questions: SurveyByIdQuestion[];
  status: string;
};

export type GetInvitedResponse = Pick<ISurvey, "templateId" | "answeredBy"> & {
    answeredByEmail: string;
};