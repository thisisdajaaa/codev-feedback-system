import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import { ApiResponse } from "@/types";

import { QuestionnaireController } from "@/features/questionnaire";
import {
  CreatedQuestionnaireResponse,
  GetQuestionnaireResponse,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<
  ICreateQuestionnaireRequest,
  NextApiResponse<
    ApiResponse<CreatedQuestionnaireResponse | GetQuestionnaireResponse[]>
  >
>({
  onError,
});

const { handlePublishQuestionnaire } = QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  // TODO add validation for path param
  .put(mongoHandler(handlePublishQuestionnaire));

export default handler;
