import React, { useState } from "react";
import { useCart } from "@/context/CartContext/CartContext";
import axios from "@/api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, CheckCircle2, AlertCircle } from "lucide-react";

export function CheckoutPage() {
  const { cart, getCartTotals, clearCart } = useCart();
  const { originalTotal, finalTotal, savings, hasDiscount } = getCartTotals();

  const [shippingAddress, setShippingAddress] = useState("");
  const [displayPaymentMethod, setDisplayPaymentMethod] = useState("SadaPay");
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      alert("Please provide a valid shipping address allocation.");
      return;
    }

    setLoading(true);
    setOrderResult(null);

    const backendPaymentMethod = "card";

    try {
      // Fire the order placement pipeline. Passing both keys to satisfy orderValidators.placeOrder
      const orderResponse = await axios.post("/orders", {
        shippingAddress,
        paymentMethod: backendPaymentMethod,
      });

      if (orderResponse.data?.success) {
        const orderId = orderResponse.data.data._id;

        // Push details directly to your simulated clearing payment gateway
        const paymentResponse = await axios.post("/payments/process", {
          orderId,
          paymentMethod: backendPaymentMethod,
          amount: cart?.totalPrice || finalTotal, 
        });

        if (paymentResponse.data?.success) {
          setOrderResult({
            success: true,
            orderId,
            message:
              "Transaction cleared successfully via local gateway routing protocols!",
          });
          await clearCart();
        }
      }
    } catch (error) {
      console.error("Validation Error Details:", error.response?.data);
      setOrderResult({
        success: false,
        message:
          error.response?.data?.message ||
          "Order settlement protocols failed to compile.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderResult?.success) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto stroke-[1.5]" />
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Order Confirmed!
        </h2>
        <p className="text-sm text-slate-400">
          Your payment via{" "}
          <span className="text-emerald-400 font-semibold">
            {displayPaymentMethod}
          </span>{" "}
          was processed successfully.
        </p>
        <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-400 select-all">
          TRACKING_ID: {orderResult.orderId}
        </div>
        <p className="text-xs text-slate-500">
          Atomic inventory reductions and pricing snapshots are safely logged
          inside the database cluster logs.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 grid grid-cols-1 md:grid-cols-5 gap-6 text-slate-100">
      {/* Forms & Inputs Console Grid */}
      <div className="md:col-span-3 space-y-6">
        <Card className="bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-emerald-400" /> Shipping Logistics
            </CardTitle>
            <CardDescription className="text-slate-400">
              Specify delivery mapping fields.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProcessOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-300">
                  Street Address Location
                </Label>
                <Input
                  id="address"
                  placeholder="e.g., Sector H-12, Islamabad, Pakistan"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white focus:border-emerald-500"
                  required
                />
              </div>

              <Separator className="bg-slate-800 my-6" />

              <div className="space-y-3">
                <Label className="text-slate-300 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-400" /> Localized
                  Payment Clearing Gateways
                </Label>

                <div className="grid grid-cols-3 gap-3">
                  {["SadaPay", "Easypaisa", "Bank Alfalah"].map((method) => (
                    <div
                      key={method}
                      onClick={() => setDisplayPaymentMethod(method)}
                      className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                        displayPaymentMethod === method
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span className="text-sm block">{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              {orderResult && !orderResult.success && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-center gap-2 mt-4">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{orderResult.message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !cart || cart?.items?.length === 0}
                className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold tracking-wide mt-6"
              >
                {loading
                  ? "Authorizing Ledger Transaction..."
                  : `Authorize Payment • Rs. ${finalTotal}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Cart Summary Panel Grid */}
      <div className="md:col-span-2">
        <Card className="bg-slate-950 border-slate-800 text-white sticky top-4">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">
              Invoice Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
              {!cart || cart.items.length === 0 ? (
                <p className="text-slate-500 text-xs italic">
                  No entries staged for processing.
                </p>
              ) : (
                cart.items.map((item) => (
                  <div
                    key={item.productId?._id}
                    className="flex justify-between items-center text-xs"
                  >
                    <div className="truncate pr-2 max-w-[150px]">
                      <span className="text-slate-400 font-medium">
                        {item.quantity}x
                      </span>{" "}
                      {item.productId?.name}
                    </div>
                    <span className="text-slate-300">
                      Rs. {(item.productId?.price || 0) * item.quantity}
                    </span>
                  </div>
                ))
              )}
            </div>

            <Separator className="bg-slate-800" />

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Baseline Subtotal</span>
                <span
                  className={hasDiscount ? "line-through text-slate-600" : ""}
                >
                  Rs. {originalTotal}
                </span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Premium Incentive Deduction</span>
                  <span>- Rs. {savings}</span>
                </div>
              )}
              <Separator className="bg-slate-800 my-2" />
              <div className="flex justify-between text-sm font-bold text-white">
                <span>Net Billing Commitment</span>
                <span className="text-emerald-400">Rs. {finalTotal}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
