import ErrorHandler from "@/utils/errorHandler";
import { sendEmail } from "@/utils/sendEmail";

import { StatusCodes } from "@/constants/statusCode";

import User from "@/models/User";
import { ROLES } from "@/models/User/config";
import type { IUser } from "@/models/User/types";

import { SurveyorVerification } from "@/templates/SurveyorVerification";

import { AUTH_MESSAGES } from "./config";
import type {
  ICommonSurveyorRequest,
  ISendSurveyorInvitationRequest,
  PickedUserDetails,
  SurveyorDetail,
} from "./types";

export const AuthService = () => {
  const filteredNewUsers = async (
    usersDetails: SurveyorDetail[]
  ): Promise<SurveyorDetail[]> => {
    const userEmails = usersDetails.map((user) => user.email);

    const existingUsers = (await User.find({
      email: { $in: userEmails },
      $or: [{ role: ROLES.SURVEYOR }, { role: ROLES.ADMIN }],
    })) as IUser[];

    const existingEmails = existingUsers.map((user) => user.email);

    return usersDetails.filter((user) => !existingEmails.includes(user.email));
  };

  const sendSurveyorVerification = async (
    req: ISendSurveyorInvitationRequest
  ): Promise<string> => {
    const { surveyorDetails } = req.body;

    const newSurveyorDetails = await filteredNewUsers(surveyorDetails);

    if (!newSurveyorDetails.length)
      throw new ErrorHandler(
        AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS,
        StatusCodes.CONFLICT
      );

    newSurveyorDetails.forEach(async ({ email, department }) => {
      const newUser: Pick<IUser, PickedUserDetails> = {
        email,
        department,
        isVerified: false,
        role: ROLES.SURVEYOR,
      };

      const { id } = (await User.create(newUser)) as IUser;

      const invitationURL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/surveyor-invitation/${id}`;

      await sendEmail({
        email,
        subject: `${department} - ${AUTH_MESSAGES.INFO.VERIFICATION_SUBJECT}`,
        html: SurveyorVerification(invitationURL),
      });
    });

    const surveyorEmails = newSurveyorDetails
      .map(({ email }) => email)
      .join(", ");

    return `${AUTH_MESSAGES.SUCCESS.VERIFICATION_EMAIL_SENT} ${surveyorEmails}`;
  };

  const acceptSurveyorVerification = async (
    req: ICommonSurveyorRequest
  ): Promise<string> => {
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

    return user.email;
  };

  return {
    sendSurveyorVerification,
    acceptSurveyorVerification,
  };
};
