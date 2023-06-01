import type { QuestionAnalyticsData } from "@/features/survey/types";

export type PieChartProps = {
  questionName: string;
  data: QuestionAnalyticsData[];
};

export type LabelPosition =
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "center"
  | "chartArea";
