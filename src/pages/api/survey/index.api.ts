import nextConnect from "next-connect";

import { SurveyController } from "@/features/survey";
import { createSurveyValidator } from "@/features/survey/validations/createSurveyBodySchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { validate } from "@/middlewares/validate";
import { CreatedSurveyResponse, ICreateSurveyRequest } from "@/features/survey/types";
import { NextApiResponse } from "next";
import { ApiResponse } from "@/types";

const handler = nextConnect<
  ICreateSurveyRequest,
  NextApiResponse<
    ApiResponse<CreatedSurveyResponse>
  >
>({
  onError,
});

const { handleCreateSurvey, handleGetSurvey } =
  SurveyController();

handler
  .use(isAuthenticatedUser)
  .get(handleGetSurvey)
  .use(isAuthenticatedUser)
  .use(validate("body", createSurveyValidator))
  .post(mongoHandler(handleCreateSurvey));

export default handler;