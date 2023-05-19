import mongoose, { Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  type: string;
  options?: string;
  isRequired: boolean;
}

export interface ITemplate extends Document {
  title: string;
  description: string;
  department: string;
  questions: IQuestion[];
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}
