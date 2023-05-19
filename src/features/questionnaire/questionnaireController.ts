import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import type { ApiResponse } from "@/types";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";
import { SurveyCoverageService } from "@/features/questionnaire/surveyCoverageService";
import { TemplateService } from "@/features/questionnaire/templateService";
import type {
  ICreateQuestionnaireRequest,
  QuestionnaireResponse,
} from "@/features/questionnaire/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const QuestionnaireController = () => {
  const { createSurveyCoverage } = SurveyCoverageService();
  const { createTemplate } = TemplateService();

  const handleCreateQuestionnaire = catchAsyncErrors(
    async (
      req: ICreateQuestionnaireRequest,
      res: NextApiResponse<ApiResponse<QuestionnaireResponse>>,
      _next: NextHandler
    ) => {
      const template = await createTemplate(req);
      const coverage = await createSurveyCoverage(req, template._id);

      const data: QuestionnaireResponse = {
        ...coverage,
        ...template,
      };

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.CREATE,
      });
    }
  );

  return { handleCreateQuestionnaire };
};
