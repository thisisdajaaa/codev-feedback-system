import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { QuestionnaireController } from "@/features/questionnaire";
import type {
  AddedQuestionResponse,
  IAddQuestionRequest,
} from "@/features/questionnaire/types";
import { questionSchema } from "@/features/questionnaire/validations/createQuestionnaireBodySchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  IAddQuestionRequest,
  NextApiResponse<ApiResponse<AddedQuestionResponse>>
>({
  onError,
});

const { handleAddQuestion } = QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .use(validate("body", questionSchema))
  .post(mongoHandler(handleAddQuestion));

export default handler;
