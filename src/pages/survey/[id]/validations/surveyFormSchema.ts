import * as yup from "yup";

import { dropdownObjectSchema } from "@/utils/validations";

import { QuestionType } from "@/constants/questionType";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";

const questionSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string(),
  type: yup
    .string()
    .trim()
    .oneOf(
      Object.keys(QuestionType),
      QUESTIONNAIRE_MESSAGES.ERROR.INVALID_QUESTION_TYPE
    ),
  isRequired: yup.boolean(),
  comment: yup.string().trim(),
  answer: yup
    .mixed()
    .when(["type", "isRequired"], {
      is: (type: string, isRequired: boolean) =>
        ["Text-Area", "Text-Input"].includes(type) && isRequired,
      then: yup.string().trim().required(),
    })
    .when(["type", "isRequired"], {
      is: (type: string, isRequired: boolean) =>
        type === "Rating" && isRequired,
      then: yup.number().required(),
    })
    .when(["type", "isRequired"], {
      is: (type: string, isRequired: boolean) =>
        !["Text-Area", "Text-Input", "Rating"].includes(type) && isRequired,
      then: dropdownObjectSchema,
    }),
});

const surveyFormSchema = yup.object().shape({
  questions: yup.array().of(questionSchema.noUnknown()),
});

export { surveyFormSchema };
