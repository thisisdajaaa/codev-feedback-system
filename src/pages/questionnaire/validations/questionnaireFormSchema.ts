import moment from "moment";
import * as yup from "yup";

import { QuestionType } from "@/constants/questionType";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";

const questionSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string().required(),
  externalId: yup.string(),
  type: yup.object().shape({
    label: yup.mixed(),
    value: yup
      .string()
      .required()
      .oneOf(
        Object.keys(QuestionType),
        QUESTIONNAIRE_MESSAGES.ERROR.INVALID_QUESTION_TYPE
      ),
  }),
  isRequired: yup.boolean(),
});

const questionnaireFormSchema = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().trim(),
  dateFrom: yup.date().typeError("Date From is Required").required(),
  dateTo: yup
    .date()
    .required()
    .typeError("Date To is Required")
    .when(
      "dateFrom",
      (dateFrom, schema) =>
        dateFrom &&
        schema.test({
          name: "is-after",
          message: QUESTIONNAIRE_MESSAGES.ERROR.INCORRECT_DATE_RANGE,
          test: (value: Date | null | undefined) => {
            if (dateFrom && value)
              return moment(value).isSameOrAfter(moment(dateFrom));

            return true;
          },
        })
    ),
  questions: yup.array().of(questionSchema.noUnknown()).min(1).required(),
});

export { questionnaireFormSchema };
