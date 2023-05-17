import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { AuthController } from "@/features/auth/authController";
import type { ISendSurveyorInvitationRequest } from "@/features/auth/types";
import { sendSurveyorVerificationSchema } from "@/features/auth/validations/sendSurveyorVerificationSchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validateBody } from "@/middlewares/validateSchema";

const handler = nextConnect<
  ISendSurveyorInvitationRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleSendSurveyorInvitation } = AuthController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.ADMIN))
  .use(validateBody(sendSurveyorVerificationSchema))
  .post(mongoHandler(handleSendSurveyorInvitation));

export default handler;
