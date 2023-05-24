import * as yup from "yup";

import { SurveyCoverageService } from "@/features/questionnaire/surveyCoverageService";

const { isExistSurveyCoverage, isTitleExistInSurveyCoverage } = SurveyCoverageService();

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

const createSurveyValidator = yup.object().shape({
  coverageId: coverageIdValidator,
  questionId: yup.string().required().test(
    {
        name: 'question',
        message: '${path} does not exist',
        test: function(id) {
            const result:Promise<boolean> = isTitleExistInSurveyCoverage(this.parent.coverageId as string, id as string);
            return result;
        },
    }
  ),
  answer: yup.string().required(),
  comment: yup.string()
});

export { createSurveyValidator };