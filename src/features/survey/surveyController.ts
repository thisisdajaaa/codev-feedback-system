import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import { ApiResponse } from "@/types";

import { SURVEY_MESSAGES } from "@/features/survey/config";
import { SurveyService } from "@/features/survey/surveyService";
import type {
  IAnswerSurveyRequest,
  SurveysResponse,
} from "@/features/survey/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const SurveyController = () => {
  const { answerSurvey, getSurveys, getAnsweredSurveysByTemplateId } =
    SurveyService();

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
        message: SURVEY_MESSAGES.SUCCESS.ALL,
      });
    }
  );

  return {
    handleAnswerSurvey,
    handleGetAnsweredSurveysByTemplateId,
    handleGetSurveys,
  };
};
