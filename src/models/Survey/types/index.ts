import mongoose, { Document } from "mongoose";

export interface ISurveyAnswer extends Document {
  questionId: mongoose.Schema.Types.ObjectId | string;
  answer: string;
  comment?: string;
}

export interface ISurvey extends Document {
  templateId: mongoose.Schema.Types.ObjectId | string;
  answeredBy: mongoose.Schema.Types.ObjectId | string;
  surveyAnswers: ISurveyAnswer[];
  dateSubmitted: string;
  isAnonymous: boolean;
  status: string;
}
