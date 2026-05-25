import { SubscriptionPlan } from "../models/subscriptionPlans.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPlan = asyncHandler(async (req, res) => {
  const { name, price, durationInDays, features, discountPercentage } =
    req.body;

  const existingPlan = await SubscriptionPlan.findOne({ name });
  if (existingPlan) {
    throw new ApiError(400, "A plan with this name already exists");
  }

  const plan = await SubscriptionPlan.create({
    name,
    price,
    durationInDays,
    features,
    discountPercentage,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, plan, "Subscription plan created successfully"));
});

// PUBLIC: Get all available plans for the pricing page
export const getAllPlans = asyncHandler(async (req, res) => {
  const plans = await SubscriptionPlan.find();
  return res
    .status(200)
    .json(new ApiResponse(200, plans, "Plans retrieved successfully"));
});
