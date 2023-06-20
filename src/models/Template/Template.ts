import mongoose, { Schema } from "mongoose";

import type { IQuestion, ITemplate } from "./types";
import { SurveyStatus, surveyStatusList } from "../Survey/config";

export const QuestionSchema = new Schema<IQuestion>(
  {
    externalId: {
      type: String,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    options: {
      type: String,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export const TemplateSchema = new Schema<ITemplate>(
  {
    externalId: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    department: {
      type: String,
    },
    questions: {
      type: [QuestionSchema],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateFrom: {
      type: String,
    },
    dateTo: {
      type: String,
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

TemplateSchema.virtual("surveys", {
  ref: "Survey",
  localField: "_id",
  foreignField: "templateId",
  justOne: false,
});

const Template =
  mongoose.models?.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
