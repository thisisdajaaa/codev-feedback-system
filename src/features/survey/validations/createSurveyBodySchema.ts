import * as yup from "yup";

import { SurveyCoverageService } from "@/features/questionnaire/surveyCoverageService";


// const dateSchema = yup
//   .string()
//   .required()
//   .test(
//     "is-date",
//     QUESTIONNAIRE_MESSAGES.ERROR.INVALID_QUESTION_TYPE,
//     (value) => moment(value, moment.ISO_8601, true).isValid()
//   );

const { isExistSurveyCoverage, isTitleExistInSurveyCoverage } = SurveyCoverageService();

const questionSchema = yup.object().shape({
  title: yup.string().required()
});

const coverageIdValidator = yup
.string()
.required()
.test(
    {
        name: 'coverageId',
        message: '${path} does not exist',
        test: (id) => isExistSurveyCoverage(id as string),
    }
);

const getSurveyValidator = yup.object().shape({
  coverageId: coverageIdValidator
});

const createSurveyValidator = yup.object().shape({
  coverageId: coverageIdValidator,
  title: yup.string().required().test(
    {
        name: 'question',
        message: 'question does not exist',
        test: function(title) {
            const result:Promise<boolean> = isTitleExistInSurveyCoverage(this.parent.coverageId as string, title as string);
            return result;
        },
    }
  ),
  answer: yup.string().required(),
  comment: yup.string()
});

export { createSurveyValidator,getSurveyValidator };