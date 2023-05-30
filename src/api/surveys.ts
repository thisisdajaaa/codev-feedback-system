import { AxiosRequestHeaders } from "axios";
import { IncomingHttpHeaders } from "http";
import { GetServerSidePropsContext } from "next";

import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type { SurveysResponse } from "@/features/survey/types";

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
