import Router from "express";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  toggleFeaturedProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from "../validators/validator.js";

const router = Router();

// Customer
router.get("/", getAllProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", productIdValidator(), validate, getProductById);

// ADMIN
router.post(
  "/",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  createProductValidator(),
  validate,
  createProduct
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  productIdValidator(),
  updateProductValidator(),
  validate,
  updateProduct
);

router.patch(
  "/:id/feature",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  productIdValidator(),
  validate,
  toggleFeaturedProduct
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(UserRolesEnum.ADMIN),
  productIdValidator(),
  validate,
  deleteProduct
);

export default router;