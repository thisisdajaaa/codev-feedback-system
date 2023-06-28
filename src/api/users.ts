import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type { ICommonSurveyorRequest } from "@/features/auth/types";
import type { UserListResponse, UserResponse } from "@/features/user/types";

export const getSurveyorsAPI = async (): Promise<ApiResponse<UserResponse>> => {
  const response = await onParseResponse<UserResponse>({
    method: "get",
    url: "/api/users?role=SURVEYOR",
  });

  return response;
};

export const getUserAPI = async (
  email: string
): Promise<ApiResponse<UserResponse>> => {
  const response = await onParseResponse<UserResponse>({
    method: "get",
    url: `/api/users?email=${email}`,
  });

  return response;
};
export const getUsersAPI = async (): Promise<ApiResponse<UserResponse>> => {
  const response = await onParseResponse<UserResponse>({
    method: "get",
    url: `/api/users`,
  });

  return response;
};
export const getUserListAPI = async (
  params?: Record<string, unknown>
): Promise<ApiResponse<UserListResponse>> => {
  const response = await onParseResponse<UserListResponse>({
    method: "get",
    url: `/api/users`,
    params,
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
