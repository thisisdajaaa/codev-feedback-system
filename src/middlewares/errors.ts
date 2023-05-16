import { NextApiRequest, NextApiResponse } from "next";
import {
  ErrorHandler as NextConnectErrorHandler,
  NextHandler,
} from "next-connect";

import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

export const onError: NextConnectErrorHandler<
  NextApiRequest,
  NextApiResponse
> = (
  err: ErrorHandler,
  _req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  let error = { ...err };

  error.message = err.message;

  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
  }

  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
