import moment from "moment";
import * as yup from "yup";

import { QuestionType } from "@/constants/questionType";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";

const dateSchema = yup
  .string()
  .required()
  .test("is-date", QUESTIONNAIRE_MESSAGES.ERROR.INVALID_DATE_FORMAT, (value) =>
    moment(value, moment.ISO_8601, true).isValid()
  );

const questionSchema = yup.object().shape({
  title: yup.string().required(),
  type: yup
    .string()
    .trim()
    .oneOf(
      Object.keys(QuestionType),
      QUESTIONNAIRE_MESSAGES.ERROR.INVALID_QUESTION_TYPE
    )
    .required(),
  options: yup.string().trim(),
  isRequired: yup.boolean().required(),
});

const questionnaireBodySchema = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  department: yup.string().trim().required(),
  dateFrom: dateSchema,
  dateTo: dateSchema.when(
    "dateFrom",
    (dateFrom, schema) =>
      dateFrom &&
      schema.test(
        "is-after",
        QUESTIONNAIRE_MESSAGES.ERROR.INCORRECT_DATE_RANGE,
        (value: string) => moment(value).isAfter(moment(dateFrom))
      )
  ),
  questions: yup
    .array()
    .of(questionSchema.noUnknown())
    .required()
    .min(1)
    .required(),
});

export { questionnaireBodySchema };
