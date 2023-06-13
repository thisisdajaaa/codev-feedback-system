export type SurveyProps = {
  id: string;
  surveyStatus: string;
  surveyName: string;
  description?: string;
  startDate: string;
  endDate: string;
  responses?: number;
  totalRespondents?: number;
  primaryAction?: string;
  isOwnSurvey?: boolean;
  onInvite?: () => void;
  onDelete?: () => void;
  onPrimaryAction?: () => void;
};
