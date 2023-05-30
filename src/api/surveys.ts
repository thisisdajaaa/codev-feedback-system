import { AxiosRequestHeaders } from "axios";
import { IncomingHttpHeaders } from "http";
import { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type {
  AnalyticsResponse,
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
