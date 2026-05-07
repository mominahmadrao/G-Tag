import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  getCart,
  updateCartItemQuantity,
} from "../controllers/cart.controllers.uzair.js";
import { cartValidators } from "../validators/index.uzair.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getCart).delete(clearCart);

router.route("/items").post(cartValidators.addItem, validate, addItemToCart);

router
  .route("/items/:productId")
  .patch(cartValidators.updateItem, validate, updateCartItemQuantity);

router.delete(
  "/items/:productId",
  cartValidators.removeItem,
  validate,
  removeItemFromCart,
);

export default router;
