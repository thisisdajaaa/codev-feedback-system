import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import type {
  CreatedSurveyResponse,
  IAnswerSurveyRequest,
} from "@/features/survey/types";
import { answerSurveyBodySchema } from "@/features/survey/validations/answerSurveyBodySchema";
import { answerSurveyQuerySchema } from "@/features/survey/validations/answerSurveyQuerySchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  IAnswerSurveyRequest,
  NextApiResponse<ApiResponse<CreatedSurveyResponse>>
>({
  onError,
});

const { handleGetSurveyByCoverageId, handleAnswerSurvey } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYEE))
  .use(validate("query", answerSurveyQuerySchema))
  .get(mongoHandler(handleGetSurveyByCoverageId))
  .use(validate("body", answerSurveyBodySchema))
  .put(mongoHandler(handleAnswerSurvey));

export default handler;
