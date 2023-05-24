import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type { ISendSurveyorInvitationRequest } from "@/features/auth/types";

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
