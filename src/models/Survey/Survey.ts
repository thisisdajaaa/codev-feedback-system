import mongoose, { Schema } from "mongoose";

import { SurveyStatus, surveyStatusList } from "./config";
import type { ISurvey, ISurveyAnswer } from "./types";

export const SurveyAnswerSchema = new Schema<ISurveyAnswer>({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
});

export const SurveySchema = new Schema<ISurvey>(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    surveyAnswers: {
      type: [SurveyAnswerSchema],
    },
    dateSubmitted: {
      type: String,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: surveyStatusList,
      default: SurveyStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false,
  }
);

SurveySchema.virtual("answeredUser", {
  ref: "User",
  localField: "answeredBy",
  foreignField: "answeredUser",
  justOne: true,
});

const Survey =
  mongoose.models?.Survey || mongoose.model<ISurvey>("Survey", SurveySchema);

export default Survey;
