import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { advancedResults } from "@/utils/advancedResults";

import { StatusCodes } from "@/constants/statusCode";

import Template from "@/models/Template";

import type { ApiResponse } from "@/types";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";
import { SurveyCoverageService } from "@/features/questionnaire/surveyCoverageService";
import { TemplateService } from "@/features/questionnaire/templateService";
import type {
  CreatedQuestionnaireResponse,
  GetQuestionnaireResponse,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const QuestionnaireController = () => {
  const { createSurveyCoverage } = SurveyCoverageService();
  const { createTemplate } = TemplateService();

  const handleGetQuestionnaires = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<GetQuestionnaireResponse[]>>,
      _next: NextHandler
    ) => {
      const populateFields = [
        { path: "createdBy", select: "name email" },
        { path: "updatedBy", select: "name email" },
        { path: "surveyCoverage", select: "dateFrom dateTo isActive" },
      ];

      const { count, pagination, data } = await advancedResults<any, any>(
        Template,
        req,
        populateFields
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        count,
        pagination,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.ALL,
      });
    }
  );

  const handleCreateQuestionnaire = catchAsyncErrors(
    async (
      req: ICreateQuestionnaireRequest,
      res: NextApiResponse<ApiResponse<CreatedQuestionnaireResponse>>,
      _next: NextHandler
    ) => {
      const createdTemplate = await createTemplate(req);
      const createdCoverage = await createSurveyCoverage(
        req,
        createdTemplate._id
      );

      const data: CreatedQuestionnaireResponse = {
        coverage: createdCoverage,
        template: createdTemplate,
      };

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.CREATE,
      });
    }
  );

  return { handleGetQuestionnaires, handleCreateQuestionnaire };
};
