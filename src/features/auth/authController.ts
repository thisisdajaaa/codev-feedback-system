import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { StatusCodes } from "@/constants/statusCode";

import type { ApiResponse } from "@/types";

import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

import { AuthService } from "./authService";
import type {
  IAcceptSurveyorInvitationRequest,
  ISendSurveyorInvitationRequest,
} from "./types";

export const AuthController = () => {
  const { sendSurveyorVerification, acceptSurveyorVerification } =
    AuthService();

  const handleSendSurveyorInvitation = catchAsyncErrors(
    async (
      req: ISendSurveyorInvitationRequest,
      res: NextApiResponse<ApiResponse<unknown>>,
      _next: NextHandler
    ) => {
      const message = await sendSurveyorVerification(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        message,
      });
    }
  );

  const handleAcceptSurveyorVerification = catchAsyncErrors(
    async (
      req: IAcceptSurveyorInvitationRequest,
      res: NextApiResponse<ApiResponse<unknown>>,
      _next: NextHandler
    ) => {
      const message = await acceptSurveyorVerification(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        message,
      });
    }
  );

  return { handleSendSurveyorInvitation, handleAcceptSurveyorVerification };
};