import * as yup from "yup";

import { emailRegex } from "@/constants/regex";

import { AUTH_MESSAGES } from "../config";

const surveyorDetailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .matches(emailRegex, AUTH_MESSAGES.ERROR.INVALID_EMAIL)
    .required(),
  department: yup.string().trim().required(),
});

const sendSurveyorVerificationSchema = yup.object().shape({
  surveyorDetails: yup
    .array()
    .of(surveyorDetailSchema.noUnknown())
    .required()
    .min(1),
});

export { sendSurveyorVerificationSchema };
