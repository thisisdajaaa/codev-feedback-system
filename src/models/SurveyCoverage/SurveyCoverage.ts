import mongoose, { Schema } from "mongoose";

import type { ISurveyCoverage } from "./types";
import { SurveyStatus, surveyStatusList } from "../Survey/config";

export const SurveyCoverageSchema = new Schema<ISurveyCoverage>(
  {
    templateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    dateFrom: {
      type: String,
      required: true,
    },
    dateTo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: surveyStatusList,
      default: SurveyStatus.DRAFT,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false,
  }
);

const SurveyCoverage =
  mongoose.models?.SurveyCoverage ||
  mongoose.model<ISurveyCoverage>("SurveyCoverage", SurveyCoverageSchema);

export default SurveyCoverage;
