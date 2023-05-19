import { NextApiRequest } from "next";

import type { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import type { ITemplate } from "@/models/Template/types";

export type PickedSurveyCoverageDetails =
  | "templateID"
  | "dateFrom"
  | "dateTo"
  | "isActive";

export type PickedTemplateDetails =
  | "title"
  | "description"
  | "department"
  | "questions"
  | "createdBy"
  | "updatedBy";

export interface ICreateQuestionnaireRequest extends NextApiRequest {
  body: {
    coverage: Omit<
      Pick<ISurveyCoverage, PickedSurveyCoverageDetails>,
      "templateID"
    >;
    template: Pick<ITemplate, PickedTemplateDetails>;
  };
}

export type QuestionnaireResponse = {
  coverage: Pick<ISurveyCoverage, PickedSurveyCoverageDetails> & { id: string };
  template: Pick<ITemplate, PickedTemplateDetails> & { id: string };
};
