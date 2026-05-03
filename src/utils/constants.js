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

// Payments Methods
export const PaymentMethodEnum = {
  CREDIT_CARD: "card",
  PAYPAL: "paypal",
  CASH_ON_DELIVERY: "cod",
};
export const AvailablePaymentMethods = Object.values(PaymentMethodEnum);

// Subscription Status
export const SubscriptionStatusEnum = {
  ACTIVE: "active",
  EXPIRED: "expired",
};

export const AvailableSubscriptionStatus = Object.values(
  SubscriptionStatusEnum,
);

// Subscription Plans
export const SubscriptionPlansEnum = {
  STANDARD: "standard",
  GAMER: "gamer",
  PREMIUM: "premium",
};

export const AvailableSubscriptionPlans = Object.values(SubscriptionPlansEnum);

