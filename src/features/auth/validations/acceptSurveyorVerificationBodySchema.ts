import * as yup from "yup";

const acceptSurveyorVerificationBodySchema = yup.object().shape({
  userId: yup.string().trim().required(),
});

export { acceptSurveyorVerificationBodySchema };
