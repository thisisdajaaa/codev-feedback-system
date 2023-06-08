import type { AxiosRequestHeaders } from "axios";
import type { IncomingHttpHeaders } from "http";
import type { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

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
