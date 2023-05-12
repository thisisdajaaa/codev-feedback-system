import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  department: string;
  role: string;
}

export enum ROLES {
  ADMIN = "ADMIN",
  SURVEYOR = "SURVEYOR",
}
