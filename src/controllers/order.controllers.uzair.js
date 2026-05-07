import { Order } from "../models/orders.models.js";
import { Cart } from "../models/carts.models.js";
import { Product } from "../models/products.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch user's cart and populate product details
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Your cart is empty");
  }

  const orderItems = [];

  for (const item of cart.items) {
    const product = item.productId;

    if (product.stock < item.quantity) {
      throw new ApiError(400, `Product ${product.name} is out of stock`);
    }

    // Capture the price and name at this exact moment
    orderItems.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  // Create the Order document
  const order = await Order.create({
    customer: userId,
    items: orderItems,
    totalAmount: cart.totalPrice,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
  });

  // DECREMENT STOCK: Update product inventory
  const updateStockPromises = cart.items.map((item) => {
    return Product.findByIdAndUpdate(item.productId._id, {
      $inc: { stock: -item.quantity },
    });
  });
  await Promise.all(updateStockPromises);

  // CLEAR CART: Remove items after successful order
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});
