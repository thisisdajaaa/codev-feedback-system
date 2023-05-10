import { getSession } from "next-auth/react";

import ErrorHandler from "@/utils/errorHandler";

import { catchAsyncErrors } from "./catchAsyncErrors";

export const isAuthenticatedUser = catchAsyncErrors(async (req, _res, next) => {
  const session = await getSession({ req });

  if (!session)
    return next(new ErrorHandler("Login first to access this resource", 401));

  req.user = session.user;

  next();
});
