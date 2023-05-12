import mongoose, { Schema } from "mongoose";

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
    isApproved: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
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
