import type { NextApiRequest } from "next";

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
  | "updatedBy"
  | "dateFrom"
  | "dateTo"
  | "status";

export type PickedTemplate = Pick<ITemplate, PickedTemplateDetails>;

export type CreatedQuestionnaireResponse = PickedTemplate & { id: string };

export type GetQuestionnaireResponse = PickedTemplate & { id: string };

export interface ICreateQuestionnaireRequest extends NextApiRequest {
  body: PickedTemplate;
}
