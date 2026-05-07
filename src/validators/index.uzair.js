import { body, param } from "express-validator";
import { PaymentMethodEnum } from "../utils/constants.js";
import { SubscriptionPlansEnum } from "../utils/constants.js";

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

const paymentValidators = {
  processPayment: [
    body("orderId").isMongoId().withMessage("Invalid Order ID"),
    body("amount")
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0"),
    body("paymentMethod")
      .notEmpty()
      .withMessage("Payment method is required")
      .isIn(Object.values(PaymentMethodEnum))
      .withMessage("Invalid payment method"),
  ],
};

const subscriptionValidators = {
  createPlan: [
    body("name")
      .isIn(Object.values(SubscriptionPlansEnum))
      .withMessage("Invalid plan name. Must be Standard, Gamer, or Premium"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("durationInDays")
      .isInt({ min: 1 })
      .withMessage("Duration must be at least 1 day"),
    body("discountPercentage")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Discount must be between 0 and 100"),
  ],
};

export { cartValidators, orderValidators, paymentValidators, subscriptionValidators };
