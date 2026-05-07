import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Cart } from "../models/carts.models.js";
import { User } from "../models/users.models.js";

const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [], totalPrice: 0 });
  }

  cart.upsertItem(productId, quantity);

  await cart.populate("items.productId");
  cart.calculateTotalPrice();

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find cart and populate products
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) throw new ApiError(404, "Cart not found");

  // FETCH DISCOUNT: Check if user has an active subscription
  const user = await User.findById(userId).populate({
    path: "subscription",
    populate: { path: "plan" },
  });

  let discount = 0;
  if (user.subscription && user.subscription.status === "active") {
    discount = user.subscription.plan.discountPercentage || 0;
  }

  // Pass that discount to your model method
  await cart.calculateTotalPrice(discount);
  await cart.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cart,
        discount > 0
          ? `Cart retrieved with ${discount}% subscription discount!`
          : "Cart retrieved successfully",
      ),
    );
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );

  await cart.populate("items.productId");
  cart.calculateTotalPrice();
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item removed from cart"));
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart cleared successfully"));
});

export { addItemToCart, getCart, removeItemFromCart, clearCart };
