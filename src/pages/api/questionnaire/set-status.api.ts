import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import { QuestionnaireController } from "@/features/questionnaire";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError,
});

const { handleQuestionnaireStatus } = QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .post(mongoHandler(handleQuestionnaireStatus));

export default handler;
