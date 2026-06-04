import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "@/api/axios"; // Utilizing your existing centralized axios configuration
import { useAuth } from "../AuthContext/Authcontext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // 1. Fetch user's cart on load or when authentication status changes
  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("/cart");
      if (response.data?.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch the active user's subscription details to determine dynamic discount tiers
  const fetchSubscriptionDiscount = async () => {
    if (!user) {
      setDiscountPercentage(0);
      return;
    }
    try {
      const response = await axios.get("/subscriptions/me");
      if (response.data?.success && response.data.data?.plan) {
        // Map premium configurations dynamically based on plan blueprint rules
        const planName = response.data.data.plan.name?.toLowerCase();
        if (planName === "premium") setDiscountPercentage(15);
        else if (planName === "gamer") setDiscountPercentage(10);
        else setDiscountPercentage(0);
      } else {
        setDiscountPercentage(0);
      }
    } catch (error) {
      console.error("Error fetching subscription discount parameters:", error);
      setDiscountPercentage(0);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchSubscriptionDiscount();
  }, [user]);

  // 3. Operational Action: Add an item to the shopping cart drawer
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post("/cart/items", { productId, quantity });
      if (response.data?.success) {
        await fetchCart(); // Rehydrate local state parameters from server truth
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to append item to cart.",
      };
    }
  };

  // 4. Operational Action: Modify quantities with real-time backend synchronization
  const updateQuantity = async (productId, currentQuantity) => {
    if (currentQuantity < 1) {
      return removeItem(productId);
    }
    try {
      const response = await axios.patch(`/cart/items/${productId}`, {
        quantity: currentQuantity,
      });
      if (response.data?.success) {
        await fetchCart();
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Quantity adjustment failed.",
      };
    }
  };

  // 5. Operational Action: Extract an item from the cart collection vector
  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(`/cart/items/${productId}`);
      if (response.data?.success) {
        await fetchCart();
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: "Failed to purge item.", error };
    }
  };

  // 6. Operational Action: Reset entire user cart selection properties
  const clearCart = async () => {
    try {
      const response = await axios.delete("/cart");
      if (response.data?.success) {
        setCart(null);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: "Failed to clear cart tracker." };
    }
  };

  // 7. Core Calculation Hook: Deriving totals dynamically while applying active subscription discounts
  const getCartTotals = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      return { originalTotal: 0, finalTotal: 0, savings: 0, itemsCount: 0 };
    }

    const itemsCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const originalTotal =
      cart.totalPrice ||
      cart.items.reduce((acc, item) => {
        const price = item.productId?.price || 0;
        return acc + price * item.quantity;
      }, 0);

    const savings = originalTotal * (discountPercentage / 100);
    const finalTotal = originalTotal - savings;

    return {
      originalTotal,
      finalTotal,
      savings,
      itemsCount,
      hasDiscount: discountPercentage > 0,
      discountPercentage,
    };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        discountPercentage,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotals,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be executed within a valid CartProvider wrapper scope.",
    );
  }
  return context;
};
