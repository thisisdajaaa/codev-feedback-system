import { getSession } from "next-auth/react";

import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import User from "@/models/User";
import type { IUser } from "@/models/User/types";

import { AUTH_MESSAGES } from "@/features/auth/config";

import { catchAsyncErrors } from "./catchAsyncErrors";
import { mongoConnect } from "./mongodb";

export const isAuthenticatedUser = catchAsyncErrors(async (req, _res, next) => {
  const session = await getSession({ req });

  await mongoConnect();

  if (!session)
    return next(
      new ErrorHandler(
        AUTH_MESSAGES.ERROR.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      )
    );

  const user = (await User.findOne({
    email: session.user.email,
  })) as IUser | null;

  if (!user)
    return next(
      new ErrorHandler(
        AUTH_MESSAGES.ERROR.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      )
    );

  req.user = user;

  next();
});
