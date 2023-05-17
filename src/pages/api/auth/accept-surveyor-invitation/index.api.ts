import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { AuthController } from "@/features/auth/authController";
import type { IAcceptSurveyorInvitationRequest } from "@/features/auth/types";
import { acceptSurveyorVerificationSchema } from "@/features/auth/validations/acceptSurveyorVerificationSchema";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";
import { validateBody } from "@/middlewares/validateSchema";

const handler = nextConnect<
  IAcceptSurveyorInvitationRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleAcceptSurveyorVerification } = AuthController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.ADMIN))
  .use(validateBody(acceptSurveyorVerificationSchema))
  .post(mongoHandler(handleAcceptSurveyorVerification));

export default handler;
