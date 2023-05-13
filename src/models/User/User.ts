import mongoose, { Schema } from "mongoose";

import { ROLES } from "./config";
import type { IUser } from "./types";

export const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.SURVEYOR, ROLES.SURVEYEE],
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
