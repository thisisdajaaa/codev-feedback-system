import Template from "@/models/Template";

import type { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";
import { ITemplate } from "@/models/Template/types";

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
      let found:boolean = false;
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
