import { Router } from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/order.controllers.uzair.js";
import { orderValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/my-orders").get(getMyOrders);
router.route("/:orderId").get(getOrderById);
// Add checkRole middleware (from your security logic)
router.patch(
  "/:orderId/status",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN), // Only admins can update status
  orderValidators.updateStatus, // Add a validator for the status enum
  validate,
  updateOrderStatus,
);

router
  .route("/")
  .get(verifyJWT, authorizeRoles(UserRolesEnum.ADMIN), getAllOrders);

router.route("/").post(orderValidators.placeOrder, validate, placeOrder);

export default router;
