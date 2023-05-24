import type { NextApiRequest, NextApiResponse } from "next";
import {
  ErrorHandler as NextConnectErrorHandler,
  NextHandler,
} from "next-connect";
import * as yup from "yup";

import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

export const onError: NextConnectErrorHandler<
  NextApiRequest,
  NextApiResponse
> = (
  err: ErrorHandler | yup.ValidationError,
  _req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  let error = { ...err };

  const isYupValidationError = (
    error: ErrorHandler | yup.ValidationError
  ): error is yup.ValidationError => {
    return error instanceof yup.ValidationError;
  };

  if (isYupValidationError(err)) {
    const errorMessage = err.errors.join(", ");
    error = new ErrorHandler(errorMessage, StatusCodes.BAD_REQUEST);
  } else {
    error = err;
    error.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    error.message = err.message;

    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }
  }

  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
