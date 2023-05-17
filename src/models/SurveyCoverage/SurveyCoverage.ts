import mongoose, { Schema } from "mongoose";

import type { ISurveyCoverage } from "./types";

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
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const SurveyCoverage =
  mongoose.models?.SurveyCoverage ||
  mongoose.model<ISurveyCoverage>("SurveyCoverage", SurveyCoverageSchema);

export default SurveyCoverage;
