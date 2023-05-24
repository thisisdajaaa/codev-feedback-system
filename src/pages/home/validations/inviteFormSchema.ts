import * as yup from "yup";

import { dropdownObjectSchema } from "@/utils/validations";

import { emailRegex } from "@/constants/regex";

import { AUTH_MESSAGES } from "@/features/auth/config";

const inviteFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .matches(emailRegex, AUTH_MESSAGES.ERROR.INVALID_EMAIL)
    .required()
    .label("Email"),
  departments: yup
    .array()
    .of(dropdownObjectSchema.noUnknown())
    .required()
    .label("Departments")
    .min(1),
});

export { inviteFormSchema };
