import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import type {
  IAnswerSurveyRequest,
  SurveysResponse,
} from "@/features/survey/types";
import { answerSurveyBodySchema } from "@/features/survey/validations/answerSurveyBodySchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  IAnswerSurveyRequest,
  NextApiResponse<ApiResponse<SurveysResponse>>
>({
  onError,
});

const { handleGetSurveys, handleAnswerSurvey } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .get(mongoHandler(handleGetSurveys))
  .use(validate("body", answerSurveyBodySchema))
  .post(mongoHandler(handleAnswerSurvey));

export default handler;
