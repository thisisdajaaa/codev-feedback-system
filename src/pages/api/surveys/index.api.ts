import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import type {
  ICreateSurveyRequest,
  SurveysResponse,
} from "@/features/survey/types";
import { createSurveyBodySchema } from "@/features/survey/validations/createSurveyBodySchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  ICreateSurveyRequest,
  NextApiResponse<ApiResponse<SurveysResponse>>
>({
  onError,
});

const { handleGetSurveys, handleCreateSurvey } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .get(mongoHandler(handleGetSurveys))
  .use(validate("body", createSurveyBodySchema))
  .post(mongoHandler(handleCreateSurvey));

export default handler;
