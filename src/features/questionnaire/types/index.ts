import type { NextApiRequest } from "next";

import type { IQuestion, ITemplate } from "@/models/Template/types";

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

export type PickedQuestion = Pick<
  IQuestion & { id: string },
  "id" | "title" | "type" | "options" | "isRequired"
>;

export type CreatedQuestionnaireResponse = PickedTemplate & { id: string };

export type AddedQuestionResponse = PickedQuestion;

export type GetQuestionnaireResponse = PickedTemplate & { id: string };

export interface ICreateQuestionnaireRequest extends NextApiRequest {
  body: PickedTemplate;
}

export interface IAddQuestionRequest extends NextApiRequest {
  body: PickedQuestion;
}
