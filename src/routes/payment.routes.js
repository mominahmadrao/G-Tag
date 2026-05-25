import { Router } from "express";
import {
  processPayment,
  getAllPayments,
  getPaymentDetails,
} from "../controllers/payment.controllers.uzair.js";
import { paymentValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/process")
  .post(paymentValidators.processPayment, validate, processPayment);

router
  .route("/payment")
  .get(authorizeRoles(UserRolesEnum.ADMIN), getAllPayments);
router.route("/:orderId").get(getPaymentDetails);

export default router;
