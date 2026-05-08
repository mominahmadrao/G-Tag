import Router from "express";
import {
  registeredUser,
  loginUser,
  logoutUser,
  verifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgetPasword,
  getCurrentUser,
  changeCurrentPassword,
  resendEmailVerification,
} from "../controllers/authUser.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPassswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
} from "../validators/validator.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";

const router = Router();

// unsecured routes
router
     .route("/register")
     .post(userRegisterValidator(), validate, registeredUser);

router
     .route("/login").post(userLoginValidator(), validate, loginUser);

router
  .route("/verify-email/:verificationToken")
  .get(verifyEmail);

router
  .route("/refreshToken")
  .post(refreshAccessToken);

router
     .route("/forgot-password")
     .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);

router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgetPasword);

// secure routes
router
     .route("/logout")
     .post(verifyJWT, logoutUser);
router
     .route("/current-user")
     .post(verifyJWT, getCurrentUser);
router
     .route("/change-password")
     .post(verifyJWT,userChangeCurrentPassswordValidator(),validate,changeCurrentPassword)
router 
     .route("/resend-email-verification")
     .post(verifyJWT,resendEmailVerification)


export default router;    
