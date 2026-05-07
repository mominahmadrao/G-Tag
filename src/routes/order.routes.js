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
router.patch(
  "/:orderId/status",
  authorizeRoles(UserRolesEnum.ADMIN),
  orderValidators.updateStatus,
  validate,
  updateOrderStatus,
);

router.route("/").get(authorizeRoles(UserRolesEnum.ADMIN), getAllOrders);

router.route("/").post(orderValidators.placeOrder, validate, placeOrder);

export default router;
