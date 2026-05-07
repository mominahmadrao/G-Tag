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

export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find all orders for this user and sort by newest first
  const orders = await Order.find({ customer: userId }).sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No orders found for this user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Order history retrieved successfully"));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    _id: orderId,
    customer: req.user._id,
  });

  if (!order) {
    throw new ApiError(
      404,
      "Order not found or you do not have permission to view it",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order details retrieved"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Use the model method we just created
  try {
    await order.updateStatus(status);
  } catch (error) {
    throw new ApiError(400, error.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, `Order status updated to ${status}`));
});