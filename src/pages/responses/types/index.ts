import type { TableRow } from "@/components/Table/types";

import type { ApiResponse } from "@/types";

import type { SurveysResponse } from "@/features/survey/types";

export type ResponsesProps = {
  items: ApiResponse<SurveysResponse>;
};

export type SurveyListProps = {
  items: ApiResponse<SurveysResponse>;
  selectedSurvey: string | null;
  handleSelectSurvey: (row: TableRow) => void;
};

export type ResponseListProps = {
  selectedSurvey: string;
};

export type SummaryListProps = {
  selectedSurvey: string;
};

export type ResponseModalProps = {
  open: boolean;
  selectedUser: string;
  selectedSurvey: string;
  handleClose: () => void;
};
