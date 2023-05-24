import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { AuthController } from "@/features/auth/authController";
import type { IAcceptSurveyorInvitationRequest } from "@/features/auth/types";
import { acceptSurveyorVerificationBodySchema } from "@/features/auth/validations/acceptSurveyorVerificationBodySchema";
import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  IAcceptSurveyorInvitationRequest,
  NextApiResponse<ApiResponse<string>>
>({ onError });

const { handleAcceptSurveyorVerification } = AuthController();

handler
  .use(validate("body", acceptSurveyorVerificationBodySchema))
  .post(mongoHandler(handleAcceptSurveyorVerification));

export default handler;
