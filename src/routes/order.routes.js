import { Router } from "express";
import { placeOrder } from "../controllers/order.controllers.uzair.js";
import { orderValidators } from "../validators/index.uzair.js";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(orderValidators.placeOrder, validate, placeOrder);

export default router;
