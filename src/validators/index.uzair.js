import { body, param } from "express-validator";

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

export { cartValidators };
