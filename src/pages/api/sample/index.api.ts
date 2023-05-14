import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { SampleController } from "@/features/sample";
import { isAuthenticatedUser } from "@/middlewares/auth";
import { onError } from "@/middlewares/errors";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleSampleMethod } = SampleController();

handler.use(isAuthenticatedUser).get(handleSampleMethod);

export default handler;
