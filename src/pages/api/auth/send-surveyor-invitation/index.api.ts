import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { sendSurveyorVerification } from "@/controllers/auth";
import type { ISendSurveyorInvitationRequest } from "@/controllers/auth/types";

import type { ApiResponse } from "@/types";

import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";

const handler = nextConnect<
  ISendSurveyorInvitationRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

handler.post(mongoHandler(sendSurveyorVerification));

export default handler;
