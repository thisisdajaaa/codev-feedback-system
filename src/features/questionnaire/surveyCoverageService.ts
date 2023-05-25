import mongoose from "mongoose";

import SurveyCoverage from "@/models/SurveyCoverage";

import type {
  CreatedQuestionnaireResponse,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";

import { TemplateService } from "./templateService";

export const SurveyCoverageService = () => {
  const createSurveyCoverage = async (
    req: ICreateQuestionnaireRequest,
    templateID: mongoose.Schema.Types.ObjectId
  ): Promise<CreatedQuestionnaireResponse["coverage"]> => {
    const { coverage } = req.body;

    const newCoverage = {
      templateID,
      ...coverage,
    };

    return await SurveyCoverage.create(newCoverage);
  };

  const isExistSurveyCoverage = async (coverageId: string
  ):Promise<boolean> => {
    let result:boolean;
    try{
      result = await SurveyCoverage.findOne({_id: coverageId}).lean();
    }catch{
      result = false;
    }
    return result;
  };

  const isTitleExistInSurveyCoverage = async (coverageId: string, questionId: string
  ):Promise<boolean> => {
    let found:boolean;
    try{
      const {templateID} = await SurveyCoverage.findOne({_id: coverageId}).lean();
      if (templateID){
        const {isTitleExistInTemplate} = TemplateService();
        found = await isTitleExistInTemplate(templateID as string, questionId);
      }else{
        found = false;
      }
    }catch{
      found = false;
    }
    return found;
  };

  return { createSurveyCoverage, isExistSurveyCoverage, isTitleExistInSurveyCoverage };
};
