import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { SampleController } from "@/features/sample";
import { onError } from "@/middlewares/errors";

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({ onError });

const { handleSampleMethod } = SampleController();

handler.get(handleSampleMethod);

export default handler;
