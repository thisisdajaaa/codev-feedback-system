import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  department?: string;
  role: string;
  isVerified: boolean;
}
