import type { TableRow } from "@/components/Table/types";

import type { ApiResponse } from "@/types";

import { GetQuestionnaireResponse } from "@/features/questionnaire/types";

export type ResponsesProps = {
  items: ApiResponse<GetQuestionnaireResponse[]>;
};

export type SurveyListProps = {
  items: ApiResponse<GetQuestionnaireResponse[]>;
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
