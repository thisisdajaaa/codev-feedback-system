import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import type { ICommonSurveyorRequest } from "@/features/auth/types";
import { commonSurveyorBodySchema } from "@/features/auth/validations/commonSurveyorBodySchema";
import { UserController } from "@/features/user";
import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";
import { validate } from "@/middlewares/validate";

const handler = nextConnect<
  ICommonSurveyorRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleRevokeSurveyor } = UserController();

handler
  .use(validate("body", commonSurveyorBodySchema))
  .post(mongoHandler(handleRevokeSurveyor));

export default handler;
