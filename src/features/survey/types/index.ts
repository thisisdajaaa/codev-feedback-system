import { NextApiRequest } from "next";

import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import { IQuestion } from "@/models/Template/types";

export type PickedSurveyDetails =
  | "coverageID"
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

export type SingleSurveyResponse = PickedSurvey & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  status: string;
};

export type SurveysResponse = SingleSurveyResponse[];

export interface IViewSurveAnswer
  extends Pick<IQuestion, "title" | "type" | "options" | "isRequired">,
    Pick<ISurveyAnswer, "questionId" | "answer" | "comment"> {}
export interface IGetSurveyResponse
  extends Pick<ISurvey, "coverageID" | "answeredBy"> {
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
