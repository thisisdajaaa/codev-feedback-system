import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type {
  IAcceptSurveyorInvitationRequest,
  ISendSurveyorInvitationRequest,
} from "@/features/auth/types";

export const sendSurveyorInvitationAPI = async (
  data: ISendSurveyorInvitationRequest["body"]
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    data,
    url: "/api/auth/send-surveyor-invitation",
  });

  return response;
};

export const acceptSurveyorInvitationAPI = async (
  data: IAcceptSurveyorInvitationRequest["body"]
): Promise<ApiResponse<string>> => {
  const response = await onParseResponse<string>({
    method: "post",
    data,
    url: "/api/auth/accept-surveyor-invitation",
  });

  return response;
};
