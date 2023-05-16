import { NextApiRequest } from "next";

export type SurveyorDetail = {
  email: string;
  department: string;
};

export interface ISendSurveyorInvitationRequest extends NextApiRequest {
  body: {
    surveyorDetails: SurveyorDetail[];
  };
}

export interface IAcceptSurveyorInvitationRequest extends NextApiRequest {
  body: {
    userId: string;
  };
}

export type PickedUserDetails = "email" | "isVerified" | "department" | "role";
