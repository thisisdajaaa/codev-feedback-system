import mongoose, { Document } from "mongoose";

export interface ISurveyAnswer extends Document {
    title: string;
    answer: string;
    comment?: string;
  }

export interface ISurvey extends Document {
  coverageID: mongoose.Schema.Types.ObjectId;
  answeredBy: mongoose.Schema.Types.ObjectId;
  surveyAnswers: ISurveyAnswer[];
  dateSubmitted: string;
  isAnonymous: boolean;
}