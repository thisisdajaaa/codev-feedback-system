import { SurveyQuestions } from "../types";

export const surveyQuestions: SurveyQuestions = {
  title: "Sample Survey Title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duration: {
    startDate: new Date(),
    endDate: new Date(),
  },
  questions: [
    {
      isRequired: true,
      question: "How satisfied are you with the services provided?",
      type: "RADIO",
    },
  ],
};
