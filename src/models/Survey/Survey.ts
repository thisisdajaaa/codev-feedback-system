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
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

export const SurveySchema = new Schema<ISurvey>(
  {
    coverageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyCoverage",
      required: true,
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    surveyAnswers: {
      type: [SurveyAnswerSchema],
      required: true,
    },
    dateSubmitted: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
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

const Survey =
  mongoose.models?.Survey || mongoose.model<ISurvey>("Survey", SurveySchema);

export default Survey;
