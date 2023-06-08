export type SurveyProps = {
  id: string;
  surveyStatus: string;
  surveyName: string;
  description?: string;
  startDate: string;
  endDate: string;
  responses?: number;
  totalRespondents?: number;
};
