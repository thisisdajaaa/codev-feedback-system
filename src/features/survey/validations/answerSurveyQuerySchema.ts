import * as yup from "yup";

const answerSurveyQuerySchema = yup.object().shape({
  coverageId: yup.string().trim().required(),
});

export { answerSurveyQuerySchema };
