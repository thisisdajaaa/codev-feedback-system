import { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import { ITemplate } from "@/models/Template/types";

export type PickedSurveyCoverageDetails = "templateID" | "dateFrom" | "dateTo" | "isActive";

export type PickedTemplateDetails = "title" | "description" | "department" | "questions" | "createdBy" | "updatedBy";

export type QuestionnaireResponse = {
  coverage: Pick<ISurveyCoverage, PickedSurveyCoverageDetails> & { id: string }
  template: Pick<ITemplate, PickedTemplateDetails> & { id: string }
};
