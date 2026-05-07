import { Router } from "express";
import {
  createPlan,
  getAllPlans,
} from "../controllers/subscriptionPlan.controllers.uzair.js";
import { subscriptionValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.get("/", getAllPlans);

router.post(
  "/",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  subscriptionValidators.createPlan,
  validate,
  createPlan,
);

export default router;
