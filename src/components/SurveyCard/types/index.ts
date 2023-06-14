export type SurveyProps = {
  id: string;
  templateId: string;
  surveyStatus: string;
  surveyName: string;
  description?: string;
  startDate: string;
  endDate: string;
  responses?: number;
  totalRespondents?: number;
  primaryAction?: string;
  isOwnSurvey?: boolean;
  onInvite?: (surveyId: string) => void;
  onDelete?: () => void;
  onPrimaryAction?: () => void;
};
