import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import { ROLE_HIERARCHY, ROLES } from "@/models/User/config";

import { AUTH_MESSAGES } from "@/features/auth/config";

import { catchAsyncErrors } from "./catchAsyncErrors";

export const roleAtLeast = (role: keyof typeof ROLES) =>
  catchAsyncErrors(async (req, _res, next) => {
    const isInsufficientPermission =
      ROLE_HIERARCHY[req.user.role as keyof typeof ROLES] <
      ROLE_HIERARCHY[role];

    if (isInsufficientPermission)
      return next(
        new ErrorHandler(
          AUTH_MESSAGES.ERROR.INSUFFICIENT_PERMISSION_LEVEL,
          StatusCodes.UNAUTHORIZED
        )
      );

    next();
  });
