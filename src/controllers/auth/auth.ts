import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import ErrorHandler from "@/utils/errorHandler";
import { sendEmail } from "@/utils/sendEmail";

import { StatusCodes } from "@/constants/statusCode";

import User from "@/models/User";
import { ROLES } from "@/models/User/config";
import { IUser } from "@/models/User/types";

import { SurveyorVerification } from "@/templates/SurveyorVerification";

import type { ApiResponse } from "@/types";

import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

import { AUTH_MESSAGES } from "./config";
import type {
  IAcceptSurveyorInvitationRequest,
  ISendSurveyorInvitationRequest,
  PickedUserDetails,
} from "./types";

export const sendSurveyorVerification = catchAsyncErrors(
  async (
    req: ISendSurveyorInvitationRequest,
    res: NextApiResponse<ApiResponse<unknown>>,
    next: NextHandler
  ) => {
    const { email, department } = req.body;

    const user = (await User.findOne({ email })) as IUser | null;

    if (user)
      return next(
        new ErrorHandler(
          AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS,
          StatusCodes.CONFLICT
        )
      );

    const newUser: Pick<IUser, PickedUserDetails> = {
      email,
      department,
      isVerified: false,
      role: ROLES.SURVEYOR,
    };

    try {
      const { id } = (await User.create(newUser)) as IUser;

      const invitationURL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/surveyor-invitation?id=${id}`;

      await sendEmail({
        email,
        subject: `${department} - ${AUTH_MESSAGES.INFO.VERIFICATION_SUBJECT}`,
        html: SurveyorVerification(invitationURL),
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: `${AUTH_MESSAGES.SUCCESS.VERIFICATION_EMAIL_SENT} ${email}`,
      });
    } catch (error) {
      const catchError = error as Error;

      return next(
        new ErrorHandler(catchError.message, StatusCodes.INTERNAL_SERVER_ERROR)
      );
    }
  }
);

export const acceptSurveyorVerification = catchAsyncErrors(
  async (
    req: IAcceptSurveyorInvitationRequest,
    res: NextApiResponse<ApiResponse<unknown>>,
    next: NextHandler
  ) => {
    const { userId } = req.body;

    const user = (await User.findOne({ _id: userId })) as IUser | null;

    if (!user)
      return next(
        new ErrorHandler(
          AUTH_MESSAGES.ERROR.USER_NOT_FOUND,
          StatusCodes.NOT_FOUND
        )
      );

    if (user.isVerified)
      return next(
        new ErrorHandler(
          AUTH_MESSAGES.ERROR.ALREADY_VERIFIED,
          StatusCodes.BAD_REQUEST
        )
      );

    user.isVerified = true;

    await user.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: AUTH_MESSAGES.SUCCESS.VERIFIED_EMAIL,
    });
  }
);
