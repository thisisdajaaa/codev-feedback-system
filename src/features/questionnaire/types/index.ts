import type { NextApiRequest } from "next";

import type { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import type { ITemplate } from "@/models/Template/types";

export type PickedSurveyCoverageDetails =
  | "templateID"
  | "dateFrom"
  | "dateTo"
  | "status";

export type PickedTemplateDetails =
  | "id"
  | "title"
  | "description"
  | "department"
  | "questions"
  | "createdBy"
  | "updatedBy";

export type PickedCoverage = Pick<ISurveyCoverage, PickedSurveyCoverageDetails>;

export type PickedTemplate = Pick<ITemplate, PickedTemplateDetails>;

export type PickedCoverageResponse = Omit<PickedCoverage, "templateID">;

export type CreatedQuestionnaireResponse = {
  coverage: PickedCoverage & { id: string };
  template: PickedTemplate & { id: string };
};

export type GetQuestionnaireResponse = PickedCoverageResponse & {
  template: PickedTemplate;
} & { id: string };

export interface ICreateQuestionnaireRequest extends NextApiRequest {
  body: {
    coverage: PickedCoverageResponse;
    template: PickedTemplate;
  };
}
