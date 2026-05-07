import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + (item.productId.price * item.quantity);
  }, 0);
  return this.totalPrice;
};

cartSchema.methods.upsertItem = function (productId, quantity) {
  const itemIndex = this.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );

  if (itemIndex > -1) {
    this.items[itemIndex].quantity += quantity;
  } else {
    this.items.push({ productId, quantity });
  }
};

export const cart = mongoose.Model("Cart", cartSchema);
