import mongoose, { Schema } from "mongoose";

import { QUESTION_TYPES } from "@/models/Template/config";
import { UserSchema } from "@/models/User/User";

import type { IQuestion, ITemplate } from "./types";

export const QuestionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      enum: Object.values(QUESTION_TYPES),
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
    _id: false,
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
      type: UserSchema,
      required: true,
    },
    updatedBy: {
      type: UserSchema,
      required: true,
    },
    createdDate: {
      type: String,
      required: true,
    },
    updatedDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Template =
  mongoose.models?.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
