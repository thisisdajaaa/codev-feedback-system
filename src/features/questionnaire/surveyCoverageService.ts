import mongoose from "mongoose";

import SurveyCoverage from "@/models/SurveyCoverage";

import { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";

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

  return { createSurveyCoverage };
};
