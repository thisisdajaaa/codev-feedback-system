import mongoose, { Schema } from "mongoose";

import { roleList } from "./config";
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
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: roleList,
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false,
  }
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
