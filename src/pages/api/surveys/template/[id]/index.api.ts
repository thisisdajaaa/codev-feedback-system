import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import type {
  CreatedSurveyResponse,
  SurveysResponse,
} from "@/features/survey/types";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<CreatedSurveyResponse | SurveysResponse>>
>({
  onError,
});

const { handleGetAnsweredSurveysByTemplateId } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .get(mongoHandler(handleGetAnsweredSurveysByTemplateId));

export default handler;
