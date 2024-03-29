import type { AxiosRequestHeaders, CancelToken } from "axios";
import type { IncomingHttpHeaders } from "http";
import type { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

import { SurveyStatus } from "@/models/Survey/config";

import type { ApiResponse } from "@/types";

import type { GetQuestionnaireResponse } from "@/features/questionnaire/types";
import type {
  AddedQuestionResponse,
  CreatedQuestionnaireResponse,
  IAddQuestionRequest,
  ICreateQuestionnaireRequest,
  IRemoveQuestionRequest,
} from "@/features/questionnaire/types";

export const addQuestionnaireOverviewAPI = async (
  data: ICreateQuestionnaireRequest["body"],
  cancelToken?: CancelToken
): Promise<ApiResponse<CreatedQuestionnaireResponse>> => {
  const response = await onParseResponse<CreatedQuestionnaireResponse>({
    method: "post",
    data,
    url: "/api/questionnaire",
    cancelToken,
  });

  return response;
};

export const addQuestionByTemplateIdAPI = async (
  templateId: string,
  data: IAddQuestionRequest["body"],
  cancelToken?: CancelToken
): Promise<ApiResponse<AddedQuestionResponse>> => {
  const response = await onParseResponse<AddedQuestionResponse>({
    method: "post",
    data,
    url: `/api/questionnaire/add-question?templateId=${templateId}`,
    cancelToken,
  });

  return response;
};

export const removeQuestionByTemplateIdAPI = async (
  templateId: string,
  data: IRemoveQuestionRequest["body"]
): Promise<ApiResponse<CreatedQuestionnaireResponse>> => {
  const response = await onParseResponse<CreatedQuestionnaireResponse>({
    method: "post",
    data,
    url: `/api/questionnaire/remove-question?templateId=${templateId}`,
  });

  return response;
};

export const getQuestionnaireByIdAPI = async (
  templateId?: string,
  context?: GetServerSidePropsContext
): Promise<ApiResponse<CreatedQuestionnaireResponse>> => {
  const headers: AxiosRequestHeaders = {};

  if (context) {
    const incomingHeaders: IncomingHttpHeaders = context.req.headers;
    headers.cookie = incomingHeaders.cookie ?? "";
  }

  const response = await onParseResponse<CreatedQuestionnaireResponse>({
    method: "get",
    url: `/api/questionnaire/${templateId}`,
    headers,
  });

  return response;
};

export const updateQuestionnaireStatusAPI = async (
  status: keyof typeof SurveyStatus,
  templateId: string,
  publish: boolean
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: `/api/questionnaire/set-status?status=${status}&templateId=${templateId}&publish=${publish}`,
  });
  return response;
};

export const searchQuestionnaires = async (
  params?: Record<string, unknown>,
  context?: GetServerSidePropsContext
): Promise<ApiResponse<GetQuestionnaireResponse[]>> => {
  const headers: AxiosRequestHeaders = {};

  if (context) {
    const incomingHeaders: IncomingHttpHeaders = context.req.headers;
    headers.cookie = incomingHeaders.cookie ?? "";
  }

  const response = await onParseResponse<GetQuestionnaireResponse[]>({
    method: "get",
    url: "api/questionnaire",
    params,
    headers,
  });

  return response;
};
