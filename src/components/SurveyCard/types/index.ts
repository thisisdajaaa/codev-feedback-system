export type SurveyProps = {
  surveyStatus: string;
  surveyName: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  responses: number;
  totalRespondents: number;
};
