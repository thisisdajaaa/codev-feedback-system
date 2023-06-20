import moment from "moment";
import * as yup from "yup";

import { QuestionType } from "@/constants/questionType";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";

export const optionalDateSchema = yup.string().test({
  name: "is-date",
  message: QUESTIONNAIRE_MESSAGES.ERROR.INVALID_DATE_FORMAT,
  test: (value) => {
    if (value && value.length > 0) {
      return moment(value, moment.ISO_8601, true).isValid();
    }
    return true;
  },
});

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
  externalId: yup.string(),
  options: yup.string().trim(),
  isRequired: yup.boolean(),
});

const questionnaireBodySchema = yup.object().shape({
  id: yup.string(),
  title: yup.string().trim(),
  description: yup.string(),
  externalId: yup.string(),
  dateFrom: optionalDateSchema,
  dateTo: optionalDateSchema.when(
    "dateFrom",
    (dateFrom, schema) =>
      dateFrom &&
      schema.test({
        name: "is-after",
        message: QUESTIONNAIRE_MESSAGES.ERROR.INCORRECT_DATE_RANGE,
        test: (value: string) => {
          if (dateFrom && value) {
            return moment(value).isSameOrAfter(moment(dateFrom));
          }
          return true;
        },
      })
  ),
  questions: yup.array().of(questionSchema.noUnknown()),
});

export { questionnaireBodySchema, questionSchema };
