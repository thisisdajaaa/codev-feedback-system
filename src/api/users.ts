import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type { UserResponse } from "@/features/user/types";

export const getSurveyorsAPI = async (): Promise<ApiResponse<UserResponse>> => {
  const response = await onParseResponse<UserResponse>({
    method: "get",
    url: "/api/users?role=SURVEYOR",
  });

  return response;
};
