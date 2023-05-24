import type { SurveyProps } from "../types";

export const surveyList: SurveyProps[] = [
  {
    surveyStatus: "Active",
    surveyName: "Working Environment Survey",
    description: "A survey for working environment",
    startDate: new Date(),
    endDate: new Date(),
    responses: 25,
    totalRespondents: 100,
  },
];
