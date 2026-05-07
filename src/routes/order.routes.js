import { Router } from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controllers.uzair.js";
import { orderValidators } from "../validators/index.uzair.js";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJWT } from "../middleware/authUser.middleware.js";
import { authorizeUserRole } from "../middleware/authorize.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/my-orders").get(getMyOrders);
router.route("/:orderId").get(getOrderById);
// Add checkRole middleware (from your security logic)
router.patch(
  "/:orderId/status",
  verifyJWT,
  authorizeUserRole(UserRolesEnum.ADMIN), // Only admins can update status
  orderValidators.updateStatus, // Add a validator for the status enum
  validate,
  updateOrderStatus,
);

router.route("/").post(orderValidators.placeOrder, validate, placeOrder);

export default router;
