
import type { AxiosRequestHeaders } from "axios";
import type { IncomingHttpHeaders } from "http";
import type { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

import { SurveyStatus } from "@/models/Survey/config";

import type { ApiResponse } from "@/types";

import type {
  AddedQuestionResponse,
  CreatedQuestionnaireResponse,
  IAddQuestionRequest,
  ICreateQuestionnaireRequest,
  IRemoveQuestionRequest,
} from "@/features/questionnaire/types";

export const addQuestionnaireOverviewAPI = async (
  data: ICreateQuestionnaireRequest["body"]
): Promise<ApiResponse<CreatedQuestionnaireResponse>> => {
  const response = await onParseResponse<CreatedQuestionnaireResponse>({
    method: "post",
    data,
    url: "/api/questionnaire",
  });

  return response;
};

export const addQuestionByTemplateIdAPI = async (
  templateId: string,
  data: IAddQuestionRequest["body"]
): Promise<ApiResponse<AddedQuestionResponse>> => {
  const response = await onParseResponse<AddedQuestionResponse>({
    method: "post",
    data,
    url: `/api/questionnaire/add-question?templateId=${templateId}`,
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
  templateId: string
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: `/api/questionnaire/set-status?status=${status}&templateId=${templateId}`,
  });
  return response;
}  

import { GetQuestionnaireResponse } from "@/features/questionnaire/types";

export const getQuestionnaires = async (): Promise<
  ApiResponse<GetQuestionnaireResponse[]>
> => {
  const response = await onParseResponse<GetQuestionnaireResponse[]>({
    method: "get",
    url: "api/questionnaire?",
  });
  return response;
};
export const searchQuestionnaires = async (
  params?: Record<string, unknown>
  // query: string,
  // filter: string,
  // page: number,
  // limit: number
): Promise<ApiResponse<GetQuestionnaireResponse[]>> => {
  const response = await onParseResponse<GetQuestionnaireResponse[]>({
    method: "get",
    url: "api/questionnaire",
    params,
  });
  return response;
};
