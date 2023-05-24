import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { advancedResults } from "@/utils/advancedResults";

import { StatusCodes } from "@/constants/statusCode";

import Survey from "@/models/Survey";
import type { ISurvey } from "@/models/Survey/types";

import type { ApiResponse } from "@/types";

import { SURVEY_MESSAGES } from "@/features/survey/config";
import { SurveyService } from "@/features/survey/surveyService";

import type {
  CreatedSurveyResponse,
  ICreateSurveyRequest,
  IGetSurveyRequest,
} from "@/features/survey/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const SurveyController = () => {
  const { createSurvey, getSurvey } = SurveyService();

  const handleCreateSurvey = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse,
      _next: NextHandler
    ) => {
      const createReq = req.body as ICreateSurveyRequest;
      createReq.userId = req.user._id;
      const createdSurvey = await createSurvey(createReq);

      return res.status(StatusCodes.OK).json({
        success: true,
        createdSurvey,
        message: SURVEY_MESSAGES.SUCCESS.CREATE,
      });
    }
  );

  const handleGetSurvey = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse,
      _next: NextHandler
    ) => {

      const {coverageId} = req.query;
      const userId = req.user._id;
      const param = {coverageId, userId} as IGetSurveyRequest;
      const result = await getSurvey(param);
      return res.status(StatusCodes.OK).json({
        success: true,
        result,
        message: SURVEY_MESSAGES.SUCCESS.ALL,
      });
    }
  );

  return { handleCreateSurvey, handleGetSurvey };
};
