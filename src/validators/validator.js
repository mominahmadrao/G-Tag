import { body,param } from "express-validator";
import { AvailableUserRoles } from "../utils/constants.js";
import mongoose from "mongoose";


// User


const userRegisterValidator = () => {
  return [
    // Email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail(),

    // Username
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters")
      .matches(/^[a-z0-9_]+$/)
      .withMessage(
        "Username can only contain lowercase letters, numbers, and underscores",
      ),

    // Password
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),

    // Full Name
    body("fullName")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
  ];
};

const userLoginValidator = () => {
  return [
    // Email
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    // password
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPassswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old Password is required"),

    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};


// Category


const createCategoryValidator = () => [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Category name too short"),
];

const updateCategoryValidator = () => [
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Category name too short"),
];

const categoryIdValidator = () => [
  param("id").isMongoId().withMessage("Invalid category ID"),
];

// Products

const createProductValidator = () => [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2 })
    .withMessage("Name too short"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be >= 0"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),
];


const updateProductValidator = () => [
  body("name").optional(),
  body("description").optional(),
  body("price").optional().isNumeric(),
  body("stock").optional().isInt({ min: 0 }),
];

const productIdValidator = () => [
  param("id").isMongoId().withMessage("Invalid product ID"),
];

export {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPassswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
  createProductValidator,
  updateProductValidator,
  productIdValidator
}

