import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

import { SurveysResponse } from "@/features/survey/types";

export const getSurveyListAPI = async (): Promise<
  ApiResponse<SurveysResponse>
> => {
  const response = await onParseResponse<SurveysResponse>({
    method: "get",
    url: "/api/surveys",
  });

  return response;
};
