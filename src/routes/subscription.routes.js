import { Router } from "express";
import {
  subscribeToPlan,
  getMySubscription,
  cancelSubscription,
} from "../controllers/userSubscription.controllers.uzair.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { checkSubscriptionExpiry } from "../middlewares/subscriptionCheck.middleware.js";
import { subscriptionValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

// Global check to check Expiry
router.use(verifyJWT, checkSubscriptionExpiry);

router.route("/me").get(getMySubscription);

router
  .route("/subscribe")
  .post(subscriptionValidators.subscribe, validate, subscribeToPlan);

router.route("/cancel").delete(cancelSubscription);

export default router;
