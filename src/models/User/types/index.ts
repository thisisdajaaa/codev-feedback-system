import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  department?: string;
  role: string;
  image?: string;
  name?: string;
  isVerified: boolean;
}
