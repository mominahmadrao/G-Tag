import { body, param } from "express-validator";
import { PaymentMethodEnum } from "../utils/constants.js";

const cartValidators = {
  addItem: [
    body("productId")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid Product ID format"),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  removeItem: [
    param("productId").isMongoId().withMessage("Invalid Product ID format"),
  ],
};

const orderValidators = {
  placeOrder: [
    body("shippingAddress")
      .trim()
      .notEmpty()
      .withMessage("Shipping address is required"),
    body("paymentMethod")
      .notEmpty()
      .withMessage("Payment method is required")
      .isIn(Object.values(PaymentMethodEnum))
      .withMessage("Invalid payment method"),
  ],
};

export { cartValidators, orderValidators };
