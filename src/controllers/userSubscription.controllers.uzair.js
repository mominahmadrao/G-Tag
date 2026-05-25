import { UserSubscription } from "../models/userSubscription.models.js";
import { SubscriptionPlan } from "../models/subscriptionPlans.models.js";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SubscriptionStatusEnum } from "../utils/constants.js";

export const subscribeToPlan = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const userId = req.user._id;

  // Verify the plan exists
  const plan = await SubscriptionPlan.findById(planId);
  if (!plan) {
    throw new ApiError(404, "The selected subscription plan does not exist");
  }

  // Check if user already has an active subscription
  const existingSub = await UserSubscription.findOne({
    user: userId,
    status: { $ne: SubscriptionStatusEnum.EXPIRED },
  });

  if (existingSub) {
    existingSub.status = SubscriptionStatusEnum.EXPIRED;
    await existingSub.save();
  }

  // Create the subscription
  const newSubscription = await UserSubscription.create({
    user: userId,
    plan: planId,
    status: SubscriptionStatusEnum.ACTIVE,
  });

  // Update the User Model to reference this subscription
  await User.findByIdAndUpdate(userId, {
    subscription: newSubscription._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newSubscription,
        `Successfully subscribed to ${plan.name} plan!`,
      ),
    );
});

export const getMySubscription = asyncHandler(async (req, res) => {
  const subscription = await UserSubscription.findOne({
    user: req.user._id,
  }).populate("plan");

  if (!subscription) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "You do not have an active subscription"),
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, subscription, "Subscription details retrieved"));
});

export const cancelSubscription = asyncHandler(async (req, res) => {
  const sub = await UserSubscription.findOne({
    user: req.user._id,
    status: SubscriptionStatusEnum.ACTIVE,
  });

  if (!sub) {
    throw new ApiError(404, "No active subscription found to cancel");
  }

  sub.status = SubscriptionStatusEnum.CANCELLED;
  await sub.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        sub,
        "Subscription cancelled. You will have access until " + sub.endDate,
      ),
    );
});
