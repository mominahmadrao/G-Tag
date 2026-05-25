import { UserSubscription } from "../models/userSubscription.models.js";
import { SubscriptionStatusEnum } from "../utils/constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const checkSubscriptionExpiry = asyncHandler(async (req, res, next) => {
  if (!req.user?.subscription) return next();

  const sub = await UserSubscription.findById(req.user.subscription);

  if (sub && sub.status !== SubscriptionStatusEnum.EXPIRED) {
    const now = new Date();

    // If current time is greater than expiry date
    if (now > sub.endDate) {
      sub.status = SubscriptionStatusEnum.EXPIRED;
      await sub.save();
    }
  }

  next();
});
