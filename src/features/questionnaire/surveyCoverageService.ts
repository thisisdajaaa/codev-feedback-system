import mongoose from "mongoose";

import SurveyCoverage from "@/models/SurveyCoverage";

import { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";
import loadConfig from "next/dist/server/config";
import { TemplateService } from "./templateService";
import { ISurveyCoverage } from "@/models/SurveyCoverage/types";

export const SurveyCoverageService = () => {
  const createSurveyCoverage = async (
    req: ICreateQuestionnaireRequest,
    templateID: mongoose.Schema.Types.ObjectId
  ) => {
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
      result = await SurveyCoverage.findOne({_id: coverageId}).lean().exec();
    }catch{
      result = false;
    }
    return result;
  };

  const isTitleExistInSurveyCoverage = async (coverageId: string, title: string
  ):Promise<boolean> => {
    let found:boolean;
    try{
      const {templateID} = await SurveyCoverage.findOne({_id: coverageId}).lean().exec();
      if (templateID){
        const {isTitleExistInTemplate} = TemplateService();
        found = await isTitleExistInTemplate(templateID as string, title);
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
