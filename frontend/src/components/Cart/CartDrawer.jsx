import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext/CartContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"; // Standard icons package

export function CartDrawer() {
  const { cart, updateQuantity, removeItem, getCartTotals } = useCart();
  const {
    originalTotal,
    finalTotal,
    savings,
    itemsCount,
    hasDiscount,
    discountPercentage,
  } = getCartTotals();

  return (
    <Sheet>
      {/* Trigger button meant to be mounted on your top header/navbar layout */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative gap-2 bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
        >
          <ShoppingBag className="h-5 w-5 text-emerald-400" />
          <span>My Cart</span>
          {itemsCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950 animate-pulse">
              {itemsCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md bg-slate-950 border-slate-800 text-slate-100 flex flex-col justify-between">
        <div>
          <SheetHeader className="space-y-1">
            <SheetTitle className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Current Selections{" "}
              <span className="text-sm font-normal text-slate-400">
                ({itemsCount} items)
              </span>
            </SheetTitle>
            <SheetDescription className="text-slate-400 text-sm">
              Review and manage item stock allocations before checkout
              operations.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4 bg-slate-800" />

          {/* Cart Items Scroll Field Container */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {!cart || cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500 text-center space-y-2">
                <ShoppingBag className="h-12 w-12 stroke-[1.5] text-slate-700" />
                <p className="text-sm">
                  Your shopping drawer is currently empty.
                </p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.productId?._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-900 space-x-3"
                >
                  {/* Item Image or Placeholder Icon */}
                  <div className="h-16 w-16 rounded bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                    {item.productId?.images?.[0] ? (
                      <img
                        src={item.productId.images[0]}
                        alt={item.productId.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="h-6 w-6 text-slate-600" />
                    )}
                  </div>

                  {/* Core Details Row */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">
                      {item.productId?.name || "Inventory Item"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Unit Price: Rs. {item.productId?.price || 0}
                    </p>
                    <p className="text-xs text-emerald-500 font-semibold mt-0.5">
                      Subtotal: Rs.{" "}
                      {(item.productId?.price || 0) * item.quantity}
                    </p>
                  </div>

                  {/* Operational Quantity Modifiers Control Cluster */}
                  <div className="flex flex-col items-end space-y-2 shrink-0">
                    <div className="flex items-center border border-slate-800 rounded bg-slate-950">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId?._id, item.quantity - 1)
                        }
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2 text-sm font-semibold text-white min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId?._id, item.quantity + 1)
                        }
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId?._id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Invoice Summary Footer & CTA Allocation */}
        {cart && cart.items.length > 0 && (
          <div className="border-t border-slate-800 pt-4 space-y-3 bg-slate-950 mt-auto">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Cart Subtotal</span>
                <span
                  className={hasDiscount ? "line-through text-slate-600" : ""}
                >
                  Rs. {originalTotal}
                </span>
              </div>

              {hasDiscount && (
                <div className="flex justify-between text-emerald-400 text-xs font-medium">
                  <span>
                    {discountPercentage}% SaaS Premium Tier Discount Applied
                  </span>
                  <span>- Rs. {savings}</span>
                </div>
              )}

              <Separator className="bg-slate-800 my-2" />
              <div className="flex justify-between text-base font-bold text-white">
                <span>Net Total</span>
                <span className="text-emerald-400">Rs. {finalTotal}</span>
              </div>
            </div>

            <SheetClose asChild>
              <Link to="/checkout" className="block w-full">
                <Button className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold tracking-wide mt-2 cursor-pointer">
                  Proceed to Checkout ➔
                </Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
