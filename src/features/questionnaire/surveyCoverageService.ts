import mongoose from "mongoose";

import SurveyCoverage from "@/models/SurveyCoverage";

import type {
  CreatedQuestionnaireResponse,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";

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

  return { createSurveyCoverage };
};
