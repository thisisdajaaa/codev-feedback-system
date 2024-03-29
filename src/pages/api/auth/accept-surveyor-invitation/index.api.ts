import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { AuthController } from "@/features/auth/authController";
import type { ICommonSurveyorRequest } from "@/features/auth/types";
import { commonSurveyorBodySchema } from "@/features/auth/validations/commonSurveyorBodySchema";
import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  ICommonSurveyorRequest,
  NextApiResponse<ApiResponse<string>>
>({ onError });

const { handleAcceptSurveyorVerification } = AuthController();

handler
  .use(validate("body", commonSurveyorBodySchema))
  .post(mongoHandler(handleAcceptSurveyorVerification));

export default handler;
