import type { ApiResponse } from "@/types";

import type { SurveysResponse } from "@/features/survey/types";
import { TableRow } from "@/components/Table/types";

export type ResponsesProps = {
  items: ApiResponse<SurveysResponse>;
};

export type SurveyListProps = {
  items: ApiResponse<SurveysResponse>;
  handleSelectSurvey: (row: TableRow) => void;
};
