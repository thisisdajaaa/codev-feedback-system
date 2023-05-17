import * as yup from "yup";

const acceptSurveyorVerificationSchema = yup.object().shape({
  userId: yup.string().trim().required(),
});

export { acceptSurveyorVerificationSchema };
