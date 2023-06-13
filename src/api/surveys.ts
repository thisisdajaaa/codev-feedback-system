import type { AxiosRequestHeaders } from "axios";
import type { IncomingHttpHeaders } from "http";
import type { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

import { SurveyStatus } from "@/models/Survey/config";

import type { ApiResponse } from "@/types";

import type {
  AnalyticsResponse,
  GetInvitedResponse,
  IAnswerSurveyRequest,
  ICreateSurveyRequest,
  SurveyByIdResponse,
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
    url: "/api/surveys/list",
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
    url: `/api/surveys/template/${templateId}`,
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

export const getSurveyByIdAPI = async (
  surveyId: string,
  context?: GetServerSidePropsContext
): Promise<ApiResponse<SurveyByIdResponse>> => {
  const headers: AxiosRequestHeaders = {};

  if (context) {
    const incomingHeaders: IncomingHttpHeaders = context.req.headers;
    headers.cookie = incomingHeaders.cookie ?? "";
  }

  const response = await onParseResponse<SurveyByIdResponse>({
    method: "get",
    url: `/api/surveys/${surveyId}`,
    headers,
  });

  return response;
};

export const answerSurveyQuestionAPI = async (
  data: IAnswerSurveyRequest["body"]
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    data,
    url: "/api/surveys/answer",
  });

  return response;
};

export const createSurveyAPI = async (
  data: ICreateSurveyRequest["body"]
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    data,
    url: "/api/surveys",
  });

  return response;
};

export const updateSurveyStatusAPI = async (
  status: keyof typeof SurveyStatus,
  surveyId: string
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: `/api/surveys/set-status?status=${status}&surveyId=${surveyId}`,
  });

  return response;
};

export const sendSurveyInvitesAPI = async (
  templateId: string,
  data: string[]
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<string>({
    method: "post",
    data,
    url: `/api/survey/send-invites?templateId=${templateId}`,
  });

  return response;
};

export const getInvitedByTemplateIdAPI = async (
  templateId: string
): Promise<ApiResponse<GetInvitedResponse[]>> => {
  const response = await onParseResponse<GetInvitedResponse[]>({
    method: "get",
    url: `/api/survey/get-invited?templateId=${templateId}`,
  });

  return response;
};
