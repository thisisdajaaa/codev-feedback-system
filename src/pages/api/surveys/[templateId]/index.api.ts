import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import type {
  CreatedSurveyResponse,
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
  NextApiResponse<ApiResponse<CreatedSurveyResponse | SurveysResponse>>
>({
  onError,
});

const { handleAnswerSurvey, handleGetAnsweredSurveysByTemplateId } =
  SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYEE))
  .get(mongoHandler(handleGetAnsweredSurveysByTemplateId))
  .use(validate("body", answerSurveyBodySchema))
  .put(mongoHandler(handleAnswerSurvey));

export default handler;
