import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { sampleMethod } from "@/controllers/sample";

import type { ApiResponse } from "@/types";

import { onError } from "@/middlewares/errors";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

handler.get(sampleMethod);

export default handler;
