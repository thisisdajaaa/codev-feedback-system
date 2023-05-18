import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/types";
import { UserResponse } from "@/features/user/types";
import { NextHandler } from "next-connect";
import { SurveyCoverageService } from "@/features/questionnaire/surveyCoverageService";
import { TemplateService } from "@/features/questionnaire/templateService";
import { StatusCodes } from "@/constants/statusCode";
import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";
import { QuestionnaireResponse } from "@/features/questionnaire/types";

export const QuestionnaireController = () => {

  const { createSurveyCoverage } = SurveyCoverageService();
  const { createTemplate } = TemplateService();

  const handleCreateQuestionnaire = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<QuestionnaireResponse>>,
      _next: NextHandler,
    ) => {

      const coverage = await createSurveyCoverage(req);
      const template = await createTemplate(req);

      const data: QuestionnaireResponse = {
        ...coverage,
        ...template,
      };

      return res.status(StatusCodes.OK).json({
        success: true,
        data: data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.CREATE,
      });
    },
  );

  return { handleCreateQuestionnaire };
};