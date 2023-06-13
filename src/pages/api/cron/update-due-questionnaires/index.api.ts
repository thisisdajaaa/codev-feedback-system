import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import type { ApiResponse } from "@/types";

import { CronController } from "@/features/cron";
import { onError } from "@/middlewares/errors";
import { mongoHandler } from "@/middlewares/mongodb";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({
  onError,
});

const { handleUpdateDueQuestionnaires } = CronController();

handler.post(mongoHandler(handleUpdateDueQuestionnaires));

export default handler;
