import { NextApiRequest } from "next";

import { advancedResults } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import User from "@/models/User";
import { roleList, ROLES } from "@/models/User/config";
import type { IUser } from "@/models/User/types";

import { USER_MESSAGES } from "./config";
import type { UserResponse } from "./types";

export const UserService = () => {
  const getUsers = async (req: NextApiRequest) => {
    const { role } = req.query;

    if (role && !roleList.includes(role as ROLES))
      throw new ErrorHandler(
        USER_MESSAGES.ERROR.INVALID_ROLE,
        StatusCodes.BAD_REQUEST
      );

    return await advancedResults<IUser, UserResponse>(User, req);
  };

  return { getUsers };
};
