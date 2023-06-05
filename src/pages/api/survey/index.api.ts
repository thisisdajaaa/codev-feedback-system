import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import type {
  IAnswerSurveyRequest,
  SurveysResponse,
} from "@/features/survey/types";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";

const handler = nextConnect<
  IAnswerSurveyRequest,
  NextApiResponse<ApiResponse<SurveysResponse>>
>({
  onError,
});

const { handleGetSurveys, handleCreateSurvey } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .get(mongoHandler(handleGetSurveys))
  .post(mongoHandler(handleCreateSurvey));

export default handler;
