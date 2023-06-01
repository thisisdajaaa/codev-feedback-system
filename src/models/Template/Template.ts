import mongoose, { Schema } from "mongoose";

import type { IQuestion, ITemplate } from "./types";
import { SurveyStatus, surveyStatusList } from "../Survey/config";

export const QuestionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    options: {
      type: String,
    },
    isRequired: {
      type: Boolean,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export const TemplateSchema = new Schema<ITemplate>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
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
