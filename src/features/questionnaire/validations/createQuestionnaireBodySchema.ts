import * as yup from "yup";
import moment from "moment";
import { QUESTION_TYPES } from "@/models/Template/config";
import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";


const dateSchema = yup
  .string()
  .required()
  .test("is-date", QUESTIONNAIRE_MESSAGES.ERROR.INVALID_QUESTION_TYPE, (value) =>
    moment(value, moment.ISO_8601, true).isValid(),
  );

const questionSchema = yup.object().shape({
  title: yup.string().required(),
  type: yup
    .string()
    .trim()
    .oneOf(Object.values(QUESTION_TYPES), QUESTIONNAIRE_MESSAGES.ERROR.INVALID_QUESTION_TYPE)
    .required(),
  options: yup.string().trim(),
  isRequired: yup.boolean().required(),
});

const questionnaireBodySchema = yup.object().shape({
  coverage: yup.object().shape({
    dateFrom: dateSchema,
    dateTo: dateSchema.when(
      "dateFrom",
      (dateFrom, schema) =>
        dateFrom &&
        schema.test(
          "is-after",
          "dateTo must be later than dateFrom",
          (value: string) => moment(value).isAfter(moment(dateFrom)),
        ),
    ),
    isActive: yup.boolean(),
  }),

  template: yup.object().shape({
    title: yup.string().trim().required(),
    description: yup.string().trim().required(),
    department: yup.string().trim().required(),
    questions: yup
      .array()
      .of(questionSchema.noUnknown())
      .required()
      .min(1)
      .required(),
  }),
});

export { questionnaireBodySchema };