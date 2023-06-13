import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import { SurveyStatus } from "@/models/Survey/config";

import { ApiResponse } from "@/types";

import { QuestionnaireService } from "@/features/questionnaire/questionnaireService";
import { SURVEY_MESSAGES } from "@/features/survey/config";
import { SurveyService } from "@/features/survey/surveyService";
import type {
  AnalyticsResponse,
  GetInvitedResponse,
  IAnswerSurveyRequest,
  ICreateSurveyRequest,
  SurveyByIdResponse,
  SurveyDetailsByUserResponse,
  SurveysResponse,
} from "@/features/survey/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const SurveyController = () => {
  const {
    createSurvey,
    answerSurvey,
    getSurveys,
    getAnsweredSurveysByTemplateId,
    getTemplateAnalytics,
    getSurveyDetailsByUser,
    isSurveyExist,
    setSurveyStatus,
    validateSurvey,
    getSurveyById,
    sendInvites,
    getInvitedByTemplateId,
  } = SurveyService();

  const { isTemplateExist } = QuestionnaireService();

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

  const handleCreateSurvey = catchAsyncErrors(
    async (
      req: ICreateSurveyRequest,
      res: NextApiResponse,
      _next: NextHandler
    ) => {
      const survey = await createSurvey(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: survey,
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

  const handleSurveyStatus = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, _next: NextHandler) => {
      const { surveyId, status } = req.query;

      if (!Object.values(SurveyStatus).includes(status as SurveyStatus)) {
        throw new ErrorHandler("Invalid status", StatusCodes.BAD_REQUEST);
      }

      if (!(await isSurveyExist(surveyId as string))) {
        throw new ErrorHandler(
          SURVEY_MESSAGES.ERROR.SURVEY_NOT_FOUND,
          StatusCodes.BAD_REQUEST
        );
      }

      if (status === SurveyStatus.FINISHED) {
        const { isValid, message } = await validateSurvey(surveyId as string);

        if (!isValid) {
          throw new ErrorHandler(
            message || "Validation error/s",
            StatusCodes.BAD_REQUEST
          );
        }
      }

      await setSurveyStatus(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: SURVEY_MESSAGES.SUCCESS.GENERIC,
      });
    }
  );

  const handleGetSurveyById = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<SurveyByIdResponse>>,
      _next: NextHandler
    ) => {
      const data = await getSurveyById(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: SURVEY_MESSAGES.SUCCESS.USER_SURVEY_DETAILS,
      });
    }
  );

  const handleSendInvites = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, _next: NextHandler) => {
      const { templateId } = req.query;

      if (!(await isTemplateExist(templateId as string))) {
        throw new ErrorHandler(
          SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
          StatusCodes.BAD_REQUEST
        );
      }

      await sendInvites(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: SURVEY_MESSAGES.SUCCESS.GENERIC,
      });
    }
  );

  const handleGetInvitedByTemplateId = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<GetInvitedResponse[]>>,
      _next: NextHandler
    ) => {
      const { templateId } = req.query;

      if (!(await isTemplateExist(templateId as string))) {
        throw new ErrorHandler(
          SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
          StatusCodes.BAD_REQUEST
        );
      }

      const surveys = await getInvitedByTemplateId(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: surveys,
        message: SURVEY_MESSAGES.SUCCESS.GENERIC,
      });
    }
  );

  return {
    handleCreateSurvey,
    handleAnswerSurvey,
    handleGetAnsweredSurveysByTemplateId,
    handleGetSurveys,
    handleGetTemplateAnalytics,
    handleGetSurveyDetailsByUser,
    handleSurveyStatus,
    handleGetSurveyById,
    handleSendInvites,
    handleGetInvitedByTemplateId,
  };
};
