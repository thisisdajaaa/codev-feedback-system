import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types";

export const getSampleMethodAPI = async (): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "get",
    url: `/api/sample`,
  });

  return response;
};
