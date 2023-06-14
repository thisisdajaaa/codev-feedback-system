import type { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { SurveyController } from "@/features/survey";
import { GetInvitedResponse } from "@/features/survey/types";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<GetInvitedResponse[]>>
>({
  onError,
});

const { handleGetInvitedByTemplateId } = SurveyController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.SURVEYOR))
  .get(mongoHandler(handleGetInvitedByTemplateId));

export default handler;
