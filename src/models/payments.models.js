import mongoose, { Schema } from "mongoose";
import { PaymentStatusEnum, PaymentMethodEnum } from "../utils/constants.js";

const paymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: Object.values(PaymentMethodEnum),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatusEnum),
      default: PaymentStatusEnum.PENDING,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentGatewayResponse: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = mongoose.model("Payment", paymentSchema);
