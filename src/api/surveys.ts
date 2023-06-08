import type { AxiosRequestHeaders } from "axios";
import type { IncomingHttpHeaders } from "http";
import type { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type {
  AnalyticsResponse,
  SurveyDetailsByUserResponse,
  SurveysResponse,
} from "@/features/survey/types";

export const getSurveyListAPI = async (
  params?: Record<string, unknown>,
  context?: GetServerSidePropsContext
): Promise<ApiResponse<SurveysResponse>> => {
  const headers: AxiosRequestHeaders = {};

  if (context) {
    const incomingHeaders: IncomingHttpHeaders = context.req.headers;
    headers.cookie = incomingHeaders.cookie ?? "";
  }

  const response = await onParseResponse<SurveysResponse>({
    method: "get",
    url: "/api/surveys",
    params,
    headers,
  });

  return response;
};

export const getAnsweredSurveysByTemplateAPI = async (
  templateId: string,
  params?: Record<string, unknown>
): Promise<ApiResponse<SurveysResponse>> => {
  const response = await onParseResponse<SurveysResponse>({
    method: "get",
    url: `/api/surveys/${templateId}`,
    params,
  });

  return response;
};

export const getSurveyAnalyticsByTemplateAPI = async (
  templateId: string
): Promise<ApiResponse<AnalyticsResponse>> => {
  const response = await onParseResponse<AnalyticsResponse>({
    method: "get",
    url: `/api/surveys/analytics?templateId=${templateId}`,
  });

  return response;
};

export const getSurveyDetailsByUserAPI = async (
  templateId: string,
  userId: string
): Promise<ApiResponse<SurveyDetailsByUserResponse>> => {
  const response = await onParseResponse<SurveyDetailsByUserResponse>({
    method: "get",
    url: `/api/surveys/details?userId=${userId}&templateId=${templateId}`,
  });

  return response;
};
