export type SurveyProps = {
  templateId: string;
  surveyStatus: string;
  surveyName: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  responses: number;
  totalRespondents: number;
};
