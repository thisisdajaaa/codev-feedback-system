import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { QuestionnaireController } from "@/features/questionnaire";
import type {
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

const { handleQuestionnaireStatus } = QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .post(mongoHandler(handleQuestionnaireStatus));

export default handler;
