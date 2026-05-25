import Router from "express";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} from "../validators/validator.js";

const router = Router();

// Customer
router.get("/", getAllCategories);

router.get("/:id", categoryIdValidator(), validate, getCategoryById);

// ADMIN
router.post(
  "/",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  createCategoryValidator(),
  validate,
  createCategory
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  categoryIdValidator(),
  updateCategoryValidator(),
  validate,
  updateCategory
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  categoryIdValidator(),
  validate,
  deleteCategory
);

export default router;