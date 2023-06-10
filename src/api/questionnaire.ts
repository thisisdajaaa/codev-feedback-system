import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

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
