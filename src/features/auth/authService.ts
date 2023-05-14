import ErrorHandler from "@/utils/errorHandler";
import { sendEmail } from "@/utils/sendEmail";

import { StatusCodes } from "@/constants/statusCode";

import User from "@/models/User";
import { ROLES } from "@/models/User/config";
import type { IUser } from "@/models/User/types";

import { SurveyorVerification } from "@/templates/SurveyorVerification";

import { AUTH_MESSAGES } from "./config";
import type {
  IAcceptSurveyorInvitationRequest,
  ISendSurveyorInvitationRequest,
  PickedUserDetails,
} from "./types";

export const AuthService = () => {
  const sendSurveyorVerification = async (
    req: ISendSurveyorInvitationRequest
  ) => {
    const { email, department } = req.body;

    const user = (await User.findOne({ email })) as IUser | null;

    if (user) {
      throw new ErrorHandler(
        AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS,
        StatusCodes.CONFLICT
      );
    }

    const newUser: Pick<IUser, PickedUserDetails> = {
      email,
      department,
      isVerified: false,
      role: ROLES.SURVEYOR,
    };

    const { id } = (await User.create(newUser)) as IUser;

    const invitationURL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/surveyor-invitation?id=${id}`;

    await sendEmail({
      email,
      subject: `${department} - ${AUTH_MESSAGES.INFO.VERIFICATION_SUBJECT}`,
      html: SurveyorVerification(invitationURL),
    });

    return `${AUTH_MESSAGES.SUCCESS.VERIFICATION_EMAIL_SENT} ${email}`;
  };

  const acceptSurveyorVerification = async (
    req: IAcceptSurveyorInvitationRequest
  ) => {
    const { userId } = req.body;

    const user = (await User.findOne({ _id: userId })) as IUser | null;

    if (!user) {
      throw new ErrorHandler(
        AUTH_MESSAGES.ERROR.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    if (user.isVerified) {
      throw new ErrorHandler(
        AUTH_MESSAGES.ERROR.ALREADY_VERIFIED,
        StatusCodes.BAD_REQUEST
      );
    }

    user.isVerified = true;

    await user.save();

    return AUTH_MESSAGES.SUCCESS.VERIFIED_EMAIL;
  };

  return {
    sendSurveyorVerification,
    acceptSurveyorVerification,
  };
};
