import Template from "@/models/Template";
import { ITemplate } from "@/models/Template/types";

import type { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";

export const TemplateService = () => {
  const createTemplate = async (req: ICreateQuestionnaireRequest) => {
    const { template } = req.body;

    const newTemplate = {
      ...template,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    return await Template.create(newTemplate);
  };

  const isTitleExistInTemplate = async (templateId: string, questionId: string
    ):Promise<boolean> => {
      let found = false;
      try{
        const template = (await Template.findOne({_id: templateId})) as ITemplate;
        found = (template && template?.questions.some(x => x.id === questionId));
      }catch{
        found = false;
      }
      return found;
    };

  return { createTemplate, isTitleExistInTemplate };
};
