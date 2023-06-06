import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import type {
  CreatedQuestionnaireResponse,
  ICreateQuestionnaireRequest,
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
