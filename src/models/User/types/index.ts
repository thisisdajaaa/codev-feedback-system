import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  department: string;
  isApproved: boolean;
  role: string;
}
