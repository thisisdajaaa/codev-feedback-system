import type { NextApiRequest } from "next";

import type { IQuestion, ITemplate } from "@/models/Template/types";

import type { ApiResponse } from "@/types";

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
  | "status"
  | "externalId";

export type PickedTemplate = Pick<ITemplate, PickedTemplateDetails>;

export type PickedQuestion = Pick<
  IQuestion & { id?: string },
  "id" | "title" | "type" | "options" | "isRequired" | "externalId"
>;

export type CreatedQuestionnaireResponse = PickedTemplate & { id: string };

export type AddedQuestionResponse = PickedQuestion & {
  templateId: string;
};

export type GetQuestionnaireApiResponse = Omit<
  ApiResponse<GetQuestionnaireResponse[]>,
  "success"
>;

export type GetQuestionnaireResponse = PickedTemplate & { id: string };

export interface ICreateQuestionnaireRequest extends NextApiRequest {
  body: PickedTemplate;
}

export interface IAddQuestionRequest extends NextApiRequest {
  body: PickedQuestion;
}

export interface IRemoveQuestionRequest extends NextApiRequest {
  body: { id: string };
}
