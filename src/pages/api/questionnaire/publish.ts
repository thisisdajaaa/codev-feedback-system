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

const handler = nextConnect<ICreateQuestionnaireRequest,
  NextApiResponse<ApiResponse<CreatedQuestionnaireResponse | GetQuestionnaireResponse[]>>>({
  onError,
});

const { handleGetQuestionnaires, handleCreateQuestionnaire } =
  QuestionnaireController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .put(mongoHandler((req, res) => {
    const { id } = req.query;
    console.log(`Publishing questionnaire with id: ${id}`);
  }));

export default handler;
