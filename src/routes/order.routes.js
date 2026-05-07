import { Router } from "express";
import { placeOrder } from "../controllers/order.controller.uzair.js";
import { orderValidators } from "../validators/index.uzair.js";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Secure all order routes

router.route("/").post(orderValidators.placeOrder, validate, placeOrder);

export default router;
