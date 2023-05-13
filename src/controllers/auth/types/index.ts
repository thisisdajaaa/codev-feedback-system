import { NextApiRequest } from "next";

export interface ISendSurveyorInvitationRequest extends NextApiRequest {
  body: {
    email: string;
    department: string;
  };
}

export interface IAcceptSurveyorInvitationRequest extends NextApiRequest {
  body: {
    userId: string;
  };
}

export type PickedUserDetails = "email" | "isVerified" | "department" | "role";
