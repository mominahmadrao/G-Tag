import { Router } from "express";
import {
  subscribeToPlan,
  getMySubscription,
  cancelSubscription,
} from "../controllers/userSubscription.controllers.uzair.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { checkSubscriptionExpiry } from "../middlewares/subscriptionCheck.middleware.js";
import { subscriptionValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// Global check to check Expiry
router.use(verifyJWT, checkSubscriptionExpiry);

router
  .route("/subscribe")
  .post(subscriptionValidators.subscribe, validate, subscribeToPlan);

router.route("/status").get(getMySubscription);
router.route("/cancel").patch(cancelSubscription);

export default router;
