import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { SampleController } from "@/features/sample";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleSampleMethod } = SampleController();

handler.use(isAuthenticatedUser).get(handleSampleMethod);

export default handler;
