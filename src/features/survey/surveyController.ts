import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import { ApiResponse } from "@/types";

import { SURVEY_MESSAGES } from "@/features/survey/config";
import { SurveyService } from "@/features/survey/surveyService";
import type {
  IAnswerSurveyRequest,
  IGetSurveyRequest,
  SurveysResponse,
} from "@/features/survey/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

import { SurveyCoverageService } from "../questionnaire/surveyCoverageService";

export const SurveyController = () => {
  const { answerSurvey, getSurveyByCoverageId, getSurveys } = SurveyService();
  const { isExistSurveyCoverage } = SurveyCoverageService();

  const handleAnswerSurvey = catchAsyncErrors(
    async (
      req: IAnswerSurveyRequest,
      res: NextApiResponse,
      _next: NextHandler
    ) => {
      const answeredSurvey = await answerSurvey(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: answeredSurvey,
        message: SURVEY_MESSAGES.SUCCESS.CREATE,
      });
    }
  );

  const handleGetSurveyByCoverageId = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, _next: NextHandler) => {
      const { coverageId, question } = req.query;
      const userId = req.user._id;
      const param = {
        coverageId,
        userId,
        title: question,
      } as IGetSurveyRequest["body"];

      if (await isExistSurveyCoverage(coverageId as string)) {
        const data = await getSurveyByCoverageId(param);

        return res.status(StatusCodes.OK).json({
          success: true,
          data,
          message: SURVEY_MESSAGES.SUCCESS.ALL,
        });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
        });
      }
    }
  );

  const handleGetSurveys = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<SurveysResponse>>,
      _next: NextHandler
    ) => {
      const { count, pagination, data } = await getSurveys(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        count,
        pagination,
        data,
        message: SURVEY_MESSAGES.SUCCESS.ALL,
      });
    }
  );

  return { handleAnswerSurvey, handleGetSurveyByCoverageId, handleGetSurveys };
};
