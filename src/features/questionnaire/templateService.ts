import { NextApiRequest } from "next";
import { ITemplate } from "@/models/Template/types";
import Template from "@/models/Template";


export const TemplateService = () => {
  const createTemplate = async (req: NextApiRequest) => {
    const { template } = req.body;

    const newTemplate: ITemplate = {
      ...template
    };
    return await Template.create(template);
  };

  return { createTemplate };
};