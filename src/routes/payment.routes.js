import { Router } from "express";
import { processPayment } from "../controllers/payment.controllers.uzair.js";
import { paymentValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/process")
  .post(paymentValidators.processPayment, validate, processPayment);

export default router;
