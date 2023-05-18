import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ApiResponse } from "@/types";

import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { QuestionnaireResponse } from "@/features/questionnaire/types";
import { QuestionnaireController } from "@/features/questionnaire";
import { ROLES } from "@/models/User/config";

const handler = nextConnect<NextApiRequest,
  NextApiResponse<ApiResponse<QuestionnaireResponse>>>({
  onError,
});

const { handleCreateQuestionnaire } = QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.ADMIN))
  // .use(TODO VALIDATORS)
  .post(mongoHandler(handleCreateQuestionnaire));

export default handler;
