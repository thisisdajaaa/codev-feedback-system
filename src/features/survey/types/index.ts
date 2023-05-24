import type { ISurvey } from "@/models/Survey/types";

export type PickedSurveyDetails =
  | "coverageID"
  | "answeredBy"
  | "surveyAnswers"
  | "dateSubmitted"

  export type PickedSurvey = Pick<ISurvey, PickedSurveyDetails>;

  export type CreatedSurveyResponse = {
    survey: PickedSurvey & { id: string };
  };

  export interface ICreateSurveyRequest {
    coverageId: string,
    userId: string,
    title: string,
    answer: string,
    comment?: string
  }

  export interface IGetSurveyRequest{
    coverageId: string,
    userId: string
  }