import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cart.controllers.uzair.js";
import { cartValidators } from "../validators/index.uzair.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/items", cartValidators.addItem, validate, addItemToCart);

router.delete(
  "/items/:productId",
  cartValidators.removeItem,
  validate,
  removeItemFromCart,
);

export default router;
