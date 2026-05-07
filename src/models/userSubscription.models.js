import mongoose, { Schema } from "mongoose";
import { SubscriptionStatusEnum } from "../utils/constants.js";

const userSubscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatusEnum), // active, expired
      default: SubscriptionStatusEnum.ACTIVE,
    },
  },
  { timestamps: true },
);

export const userSubscription = mongoose.model(
  "UserSubscription",
  userSubscription,
);
