import * as yup from "yup";

const commonSurveyorBodySchema = yup.object().shape({
  userId: yup.string().trim().required(),
});

export { commonSurveyorBodySchema };
