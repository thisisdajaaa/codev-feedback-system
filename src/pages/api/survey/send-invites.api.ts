import type { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import { SurveyController } from "@/features/survey";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError,
});

const { handleSendInvites } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .post(mongoHandler(handleSendInvites));

export default handler;
