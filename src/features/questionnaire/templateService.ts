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

    let isExist = false;
    let dbTemplate = {} as ITemplate;

    if (newTemplate.id) {
      isExist = true;
      dbTemplate = (await Template.findOneAndUpdate(
        { _id: newTemplate.id },
        newTemplate,
        { new: true }
      )) as ITemplate;
    }

    if (!isExist) {
      dbTemplate = (await Template.create(newTemplate)) as ITemplate;
    }

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
    } = dbTemplate;

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

  const isTemplateExist = async (templateId: string): Promise<boolean> => {
    let found = false;
    try {
      found = await Template.findOne({
        _id: templateId,
      }).lean();
    } catch {
      found = false;
    }
    return found;
  };

  return { createTemplate, isTitleExistInTemplate, isTemplateExist };
};
