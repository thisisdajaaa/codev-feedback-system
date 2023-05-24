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

  const isTitleExistInTemplate = async (templateId: string, title: string
    ):Promise<boolean> => {
      let found = false;
      try{
        const template:ITemplate = await Template.findOne({_id: templateId}).lean().exec();
        found = (template && template.questions.some(x => x.title === title));
      }catch{
        found = false;
      }
      return found;
    };

  return { createTemplate, isTitleExistInTemplate };
};
