import * as yup from "yup";

const createSurveyBodySchema = yup.object().shape({
  templateId: yup.string().trim().required(),
  isAnonymous: yup.boolean().required(),
});

export { createSurveyBodySchema };
