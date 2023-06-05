import type { Question, QuestionnaireForm } from "../types";

export const initialQuestionnaireValues: QuestionnaireForm = {
  title: "",
  description: "",
  dateFrom: null,
  dateTo: null,
  questions: [],
};

export const newQuestion: Question = {
  title: "",
  type: null,
  isRequired: false,
  options: [],
};
