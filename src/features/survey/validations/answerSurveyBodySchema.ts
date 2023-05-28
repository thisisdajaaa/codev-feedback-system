import * as yup from "yup";

const answerSurveyBodySchema = yup.object().shape({
  questionId: yup.string().trim().required(),
  answer: yup.string().trim().required(),
  comment: yup.string(),
});

export { answerSurveyBodySchema };
