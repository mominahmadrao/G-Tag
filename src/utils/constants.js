// User Roles
export const UserRolesEnum = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);


// Order Status
export const OrderStatusEnum = {
  PLACED: "placed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const AvailableOrderStatus = Object.values(OrderStatusEnum);


// Payment Status
export const PaymentStatusEnum = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
};

export const AvailablePaymentStatus = Object.values(PaymentStatusEnum);


// Subscription Status
export const SubscriptionStatusEnum = {
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
};

export const AvailableSubscriptionStatus = Object.values(SubscriptionStatusEnum);