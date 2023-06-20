import mongoose, { Document } from "mongoose";

export interface IQuestion extends Document {
  id?: string;
  title?: string;
  type?: string;
  options?: string;
  isRequired?: boolean;
  externalId?: string;
}

export interface ITemplate extends Document {
  externalId?: string;
  title?: string;
  description?: string;
  department?: string;
  questions?: IQuestion[];
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  createdBy?: mongoose.Schema.Types.ObjectId;
  updatedBy?: mongoose.Schema.Types.ObjectId;
}
