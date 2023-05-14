import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { AuthController } from "@/features/auth/authController";
import type { IAcceptSurveyorInvitationRequest } from "@/features/auth/types";
import { isAuthenticatedUser } from "@/middlewares/auth";
import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<
  IAcceptSurveyorInvitationRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleAcceptSurveyorVerification } = AuthController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.ADMIN))
  .post(mongoHandler(handleAcceptSurveyorVerification));

export default handler;
