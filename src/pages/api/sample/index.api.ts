import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { SampleController } from "@/features/sample";
import { onError } from "@/middlewares/errors";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleSampleMethod } = SampleController();

handler.get(handleSampleMethod);

export default handler;
