import { Router } from "express";
import {
  processPayment,
  getAllPayments,
  getPaymentDetails,
} from "../controllers/payment.controllers.uzair.js";
import { paymentValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/process")
  .post(paymentValidators.processPayment, validate, processPayment);

router
  .route("/payment")
  .get(verifyJWT, authorizeRoles(UserRolesEnum.ADMIN), getAllPayments);
router.route("/:orderId").get(verifyJWT, getPaymentDetails);

export default router;
