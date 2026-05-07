import mongoose, { Schema } from "mongoose";
import { SubscriptionPlansEnum } from "../utils/constants.js";

const subscriptionPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(SubscriptionPlansEnum),
    },
    price: { type: Number, required: true, min: 0 },
    durationInDays: { type: Number, default: 30 },
    discountPercentage: { type: Number, default: 0 },
    features: [{ type: String }],
  },
  { timestamps: true },
);

export const subscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema,
);
