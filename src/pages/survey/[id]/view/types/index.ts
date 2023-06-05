export type Questions = {
  isRequired: boolean;
  question: string;
  type: string;
};

type Duration = {
  startDate: Date;
  endDate: Date;
};

export type SurveyQuestions = {
  title: string;
  description: string;
  duration: Duration;
  questions: Questions[];
};
