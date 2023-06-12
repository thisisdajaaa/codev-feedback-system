import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import type { ApiResponse } from "@/types";

import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

import { CRON_MESSAGES } from "./config";
import { CronService } from "./cronService";

export const CronController = () => {
  const { updateDueQuestionnaires } = CronService();

  const handleUpdateDueQuestionnaires = catchAsyncErrors(
    async (
      _req: NextApiRequest,
      res: NextApiResponse<ApiResponse<unknown>>,
      _next: NextHandler
    ) => {
      await updateDueQuestionnaires();

      return res.status(StatusCodes.OK).json({
        success: true,
        message: CRON_MESSAGES.SUCCESS.UPDATED_DUE_QUESTIONNAIRES,
      });
    }
  );

  return { handleUpdateDueQuestionnaires };
};
