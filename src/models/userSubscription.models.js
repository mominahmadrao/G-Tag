import mongoose, { Schema } from "mongoose";
import { SubscriptionStatusEnum } from "../utils/constants.js";
import {ApiError} from "../utils/apiError.js";

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

userSubscriptionSchema.pre("save", async function (next) {
  if (!this.isModified("plan")) return next();

  try {
    const SubscriptionPlan = mongoose.model("SubscriptionPlan");
    const planDetails = await SubscriptionPlan.findById(this.plan);

    if (!planDetails) {
      // Use your custom ApiError here for consistency
      return next(new ApiError(404, "Subscription Plan not found"));
    }

    const expirationDate = new Date();
    expirationDate.setDate(
      expirationDate.getDate() + planDetails.durationInDays,
    );
    this.endDate = expirationDate;

    next();
  } catch (error) {
    next(error);
  }
});

export const userSubscription = mongoose.model(
  "UserSubscription",
  userSubscription,
);
