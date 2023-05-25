import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import { SURVEY_MESSAGES } from "@/features/survey/config";
import { SurveyService } from "@/features/survey/surveyService";
import type {
  CreatedSurveyResponse,
  ICreateSurveyRequest,
  IGetSurveyRequest,
} from "@/features/survey/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";
import { SurveyCoverageService } from "../questionnaire/surveyCoverageService";
import { ApiResponse } from "@/types";

export const SurveyController = () => {
  const { createSurvey, getSurvey } = SurveyService();
  const { isExistSurveyCoverage } = SurveyCoverageService();

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
        data: createdSurvey,
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

      if (await isExistSurveyCoverage(coverageId as string)){
        const data = await getSurvey(param);
        return res.status(StatusCodes.OK).json({
          success: true,
          data,
          message: SURVEY_MESSAGES.SUCCESS.ALL,
        });
      }else{
        return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
      });
      }
      
    }
  );

  return { handleCreateSurvey, handleGetSurvey };
};
