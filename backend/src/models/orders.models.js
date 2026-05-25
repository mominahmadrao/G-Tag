import mongoose, { Schema } from "mongoose";
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
} from "../utils/constants.js";

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"],
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethodEnum),
      default: PaymentMethodEnum.CASH_ON_DELIVERY,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatusEnum),
      default: PaymentStatusEnum.PENDING,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatusEnum),
      default: OrderStatusEnum.PLACED,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.methods.updateStatus = async function (newStatus) {
  // Logic: Define forbidden transitions
  if (this.orderStatus === OrderStatusEnum.DELIVERED) {
    throw new Error("Cannot change status of a delivered order");
  }

  if (this.orderStatus === OrderStatusEnum.CANCELLED) {
    throw new Error("Cannot change status of a cancelled order");
  }

  this.orderStatus = newStatus;
  return this.save();
};

export const Order = mongoose.model("Order", orderSchema);
