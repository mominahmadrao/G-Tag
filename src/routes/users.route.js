import Router from "express";
import {
  getProfile,
  getUserById,
  getAllUsers,
  updateProfile,
  updatePassword,
  deleteUser,
} from "../controllers/user.controller.js";
import {UserRolesEnum} from "../utils/constants.js"
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";

const router = Router();

router.get("/me", verifyJWT, getProfile);
router.patch("/me", verifyJWT, updateProfile);

router.patch("/me/password", verifyJWT, updatePassword);

// ADMIN
router.get(
  "/",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  getAllUsers
)
router.get(
  "/:id",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  getUserById
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  deleteUser
);

export default router;
