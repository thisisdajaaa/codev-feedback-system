import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { QuestionnaireController } from "@/features/questionnaire";
import type { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";
import { questionnaireBodySchema } from "@/features/questionnaire/validations/createQuestionnaireBodySchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  ICreateQuestionnaireRequest,
  NextApiResponse<ApiResponse<any>>
>({
  onError,
});

const { handleGetQuestionnaires, handleCreateQuestionnaire } =
  QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .get(mongoHandler(handleGetQuestionnaires))
  .use(validate("body", questionnaireBodySchema))
  .post(mongoHandler(handleCreateQuestionnaire));

export default handler;
