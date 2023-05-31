import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import { ApiResponse } from "@/types";

import { SURVEY_MESSAGES } from "@/features/survey/config";
import { SurveyService } from "@/features/survey/surveyService";
import type {
  AnalyticsResponse,
  IAnswerSurveyRequest,
  SurveyDetailsByUserResponse,
  SurveysResponse,
} from "@/features/survey/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const SurveyController = () => {
  const {
    answerSurvey,
    getSurveys,
    getAnsweredSurveysByTemplateId,
    getTemplateAnalytics,
    getSurveyDetailsByUser,
  } = SurveyService();

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

  const handleGetSurveys = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<SurveysResponse>>,
      _next: NextHandler
    ) => {
      const surveys = await getSurveys(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        ...surveys,
        message: SURVEY_MESSAGES.SUCCESS.ALL,
      });
    }
  );

  const handleGetAnsweredSurveysByTemplateId = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<SurveysResponse>>,
      _next: NextHandler
    ) => {
      const surveys = await getAnsweredSurveysByTemplateId(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        ...surveys,
        message: SURVEY_MESSAGES.SUCCESS.ALL_ANSWERED_SURVEYS,
      });
    }
  );

  const handleGetTemplateAnalytics = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<AnalyticsResponse>>,
      _next: NextHandler
    ) => {
      const data = await getTemplateAnalytics(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: SURVEY_MESSAGES.SUCCESS.ALL_ANALYTICS,
      });
    }
  );

  const handleGetSurveyDetailsByUser = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<SurveyDetailsByUserResponse>>,
      _next: NextHandler
    ) => {
      const data = await getSurveyDetailsByUser(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: SURVEY_MESSAGES.SUCCESS.USER_SURVEY_DETAILS,
      });
    }
  );

  return {
    handleAnswerSurvey,
    handleGetAnsweredSurveysByTemplateId,
    handleGetSurveys,
    handleGetTemplateAnalytics,
    handleGetSurveyDetailsByUser,
  };
};
