import { Product } from "../models/products.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const checkProductStock = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const productId = req.params.productId || req.body.productId;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.stock < quantity) {
    throw new ApiError(
      400,
      `Insufficient stock. Only ${product.stock} units available.`,
    );
  }
  req.product = product;
  next();
});
