import mongoose, { Schema } from "mongoose";
import { SubscriptionStatusEnum } from "../utils/constants.js";
import { ApiError } from "../utils/apiError.js";

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
    endDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatusEnum), // active, expired
      default: SubscriptionStatusEnum.ACTIVE,
    },
  },
  { timestamps: true },
);

userSubscriptionSchema.pre("save", async function () {
  if (!this.isModified("plan")) return;

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

  } catch (error) {
    next(error);
  }
});

export const UserSubscription = mongoose.model(
  "UserSubscription",
  userSubscriptionSchema,
);
