import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import type { ApiResponse } from "@/types";

import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

import { USER_MESSAGES } from "./config";
import type { UserResponse } from "./types";
import { UserService } from "./userService";

export const UserController = () => {
  const { getUsers } = UserService();

  const handleGetUsers = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<UserResponse>>,
      _next: NextHandler
    ) => {
      const { count, pagination, data } = await getUsers(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        count,
        pagination,
        data,
        message: USER_MESSAGES.SUCCESS.ALL_USERS,
      });
    }
  );

  return { handleGetUsers };
};
