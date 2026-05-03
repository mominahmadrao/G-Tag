import mongoose, { Schema } from "mongoose";
import { AvailableUserRoles } from "../utils/constants.js";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/200X200",
        localPath: "",
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    role: {
      type: String,
      enum: AvailableUserRoles,
      default: "customer",
    },

    subscription: {
      type: Schema.Types.ObjectId,
      ref: "UserSubscription",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    emailVerificationToken: String,
    emailVerificationExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);