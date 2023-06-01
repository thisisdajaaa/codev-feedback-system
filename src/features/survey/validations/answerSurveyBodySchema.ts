import * as yup from "yup";

const answerSurveyBodySchema = yup.object().shape({
  templateId: yup.string().trim().required(),
  questionId: yup.string().trim().required(),
  answer: yup.string().trim().required(),
  comment: yup.string().trim(),
});

export { answerSurveyBodySchema };
