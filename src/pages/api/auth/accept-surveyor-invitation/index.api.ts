import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { acceptSurveyorVerification } from "@/controllers/auth";
import type { IAcceptSurveyorInvitationRequest } from "@/controllers/auth/types";

import type { ApiResponse } from "@/types";

import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";

const handler = nextConnect<
  IAcceptSurveyorInvitationRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

handler.post(mongoHandler(acceptSurveyorVerification));

export default handler;
