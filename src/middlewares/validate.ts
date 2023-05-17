import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import * as yup from "yup";

import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import type { ValidationRequestOptions } from "@/types";

import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const validate = (
  part: ValidationRequestOptions,
  schema: yup.AnyObjectSchema
) =>
  catchAsyncErrors(async (req, _res: NextApiResponse, next: NextHandler) => {
    try {
      await schema
        .strict(true)
        .noUnknown()
        .validate(req[part], { abortEarly: false });

      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw error;
      } else {
        const err = error as Error;
        throw new ErrorHandler(err.message, StatusCodes.BAD_REQUEST);
      }
    }
  });
