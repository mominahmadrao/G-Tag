import { Payment } from "../models/payments.models.js";
import { Order } from "../models/orders.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PaymentStatusEnum, OrderStatusEnum } from "../utils/constants.js";

export const processPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod, amount } = req.body;
  const userId = req.user._id;

  //Verify the order exists and belongs to the user
  const order = await Order.findOne({ _id: orderId, customer: userId });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Security Check: Ensure payment amount matches order total
  if (order.totalAmount !== amount) {
    throw new ApiError(400, "Payment amount mismatch");
  }

  // Prevent double payments
  if (order.paymentStatus === PaymentStatusEnum.PAID) {
    throw new ApiError(400, "This order is already paid");
  }

  //Simulate a Transaction ID
  const transactionId = `GTAG-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

  // Create Payment Record
  const payment = await Payment.create({
    orderId,
    customerId: userId,
    amount,
    method: paymentMethod,
    status: PaymentStatusEnum.PAID,
    transactionId,
  });

  // UPDATE ORDER STATUS: Sync the payment status back to the Order
  order.paymentStatus = PaymentStatusEnum.PAID;
  await order.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { payment, transactionId },
        "Payment processed successfully",
      ),
    );
});
