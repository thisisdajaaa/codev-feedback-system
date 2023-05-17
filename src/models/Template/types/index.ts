import { Document } from "mongoose";

import { IUser } from "@/models/User/types";

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
  createdBy: IUser;
  updatedBy: IUser;
  createdDate: string;
  updatedDate: string;
}
