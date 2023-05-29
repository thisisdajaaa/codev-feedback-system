import Template from "@/models/Template";
import { ITemplate } from "@/models/Template/types";

import type {
  CreatedQuestionnaireResponse,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";

export const TemplateService = () => {
  const createTemplate = async (
    req: ICreateQuestionnaireRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const newTemplate = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    const {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    } = (await Template.create(newTemplate)) as ITemplate;

    const formattedResponse: CreatedQuestionnaireResponse = {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    };

    return formattedResponse;
  };

  const isTitleExistInTemplate = async (
    templateId: string,
    questionId: string
  ): Promise<boolean> => {
    let found = false;
    try {
      const template = (await Template.findOne({
        _id: templateId,
      })) as ITemplate;
      found = template && template?.questions.some((x) => x.id === questionId);
    } catch {
      found = false;
    }
    return found;
  };

  return { createTemplate, isTitleExistInTemplate };
};
