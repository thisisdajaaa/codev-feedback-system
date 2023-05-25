import mongoose, { Schema } from "mongoose";

import { QUESTION_TYPES } from "@/models/Template/config";

import type { IQuestion, ITemplate } from "./types";

export const QuestionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      enum: Object.values(QUESTION_TYPES),
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
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false,
  }
);

TemplateSchema.virtual("surveyCoverage", {
  ref: "SurveyCoverage",
  localField: "_id",
  foreignField: "templateID",
  justOne: true,
});

const Template =
  mongoose.models?.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
