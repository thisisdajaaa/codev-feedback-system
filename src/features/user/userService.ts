import type { NextApiRequest } from "next";

import { advancedResults } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import User from "@/models/User";
import { roleList, ROLES } from "@/models/User/config";
import type { IUser } from "@/models/User/types";

import type { AdvancedResultsOptions } from "@/types";

import { USER_MESSAGES } from "./config";
import type { GetUsersResponse, UserResponse } from "./types";
import type { ICommonSurveyorRequest } from "../auth/types";

export const UserService = () => {
  const getUsers = async (req: NextApiRequest): Promise<GetUsersResponse> => {
    const { role } = req.query;

    if (role && !roleList.includes(role as ROLES))
      throw new ErrorHandler(
        USER_MESSAGES.ERROR.INVALID_ROLE,
        StatusCodes.BAD_REQUEST
      );

    const options: AdvancedResultsOptions<IUser> = {
      model: User,
      req,
    };

    return await advancedResults<IUser, UserResponse>(options);
  };

  const revokeSurveyor = async (
    req: ICommonSurveyorRequest
  ): Promise<string> => {
    const { userId } = req.body;

    const user = (await User.findOne({ _id: userId })) as IUser | null;

    if (!user) {
      throw new ErrorHandler(
        USER_MESSAGES.ERROR.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    if (user.role === ROLES.SURVEYEE) {
      throw new ErrorHandler(
        USER_MESSAGES.ERROR.ALREADY_REVOKED,
        StatusCodes.BAD_REQUEST
      );
    }

    user.role = ROLES.SURVEYEE;

    await user.save();

    return USER_MESSAGES.SUCCESS.REVOKED;
  };

  return { getUsers, revokeSurveyor };
};
