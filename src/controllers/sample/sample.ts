import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import type { ApiResponse } from "@/types";

import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

import { SAMPLE_MESSAGES } from "./config";

export const sampleMethod = catchAsyncErrors(
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<unknown>>,
    next: NextHandler
  ) => {
    const { customerId = "testId" } = req.body;

    if (!customerId)
      return next(
        new ErrorHandler(
          SAMPLE_MESSAGES.ERROR.CUSTOMER_NOT_FOUND,
          StatusCodes.NOT_FOUND
        )
      );

    res.status(StatusCodes.OK).json({
      success: true,
      message: SAMPLE_MESSAGES.SUCCESS.CUSTOMER_DETAILS,
    });
  }
);
