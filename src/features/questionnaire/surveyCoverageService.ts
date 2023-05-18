import { NextApiRequest } from "next";
import { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import SurveyCoverage from "@/models/SurveyCoverage";

export const SurveyCoverageService = () => {

  const saveSurveyCoverage = async (req: NextApiRequest) => {
    const { coverage } = req.body;

    const newCoverage: ISurveyCoverage = {
      ...coverage
    };

    return await SurveyCoverage.create(newCoverage);
  };

  return { saveSurveyCoverage };
};