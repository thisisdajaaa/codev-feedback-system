export enum SurveyStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  DELETED = "DELETED",
}

export const surveyStatusList = Object.values(SurveyStatus);
