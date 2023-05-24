import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type { ICommonSurveyorRequest } from "@/features/auth/types";
import type { UserResponse } from "@/features/user/types";

export const getSurveyorsAPI = async (): Promise<ApiResponse<UserResponse>> => {
  const response = await onParseResponse<UserResponse>({
    method: "get",
    url: "/api/users?role=SURVEYOR",
  });

  return response;
};

export const revokeSurveyorAPI = async (
  data: ICommonSurveyorRequest["body"]
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<string>({
    method: "post",
    data,
    url: "/api/users/revoke-surveyor",
  });

  return response;
};
