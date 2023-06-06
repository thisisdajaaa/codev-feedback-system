import type { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";

import { SurveyController } from "@/features/survey";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError,
});

const { handleSurveyStatus } = SurveyController();

handler.use(isAuthenticatedUser).post(mongoHandler(handleSurveyStatus));

export default handler;
