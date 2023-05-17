import mongoose, { Document } from "mongoose";

export interface ISurveyCoverage extends Document {
  templateID: mongoose.Schema.Types.ObjectId;
  dateFrom: string;
  dateTo: string;
  isActive: boolean;
}
