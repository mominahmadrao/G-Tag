import { Router } from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controllers.uzair.js";
import { orderValidators } from "../validators/index.uzair.js";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/my-orders").get(getMyOrders);
router.route("/:orderId").get(getOrderById);

router.route("/").post(orderValidators.placeOrder, validate, placeOrder);

export default router;
