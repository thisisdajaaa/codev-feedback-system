import Template from "@/models/Template";

import type {
  CreatedQuestionnaireResponse,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";

export const TemplateService = () => {
  const createTemplate = async (
    req: ICreateQuestionnaireRequest
  ): Promise<CreatedQuestionnaireResponse["template"]> => {
    const { template } = req.body;

    const newTemplate = {
      ...template,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    return await Template.create(newTemplate);
  };

  return { createTemplate };
};
