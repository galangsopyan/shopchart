"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function refreshCart() {
    setCart(getCart());
  }

  useEffect(() => {
    refreshCart();

    window.addEventListener(
      "cart-updated",
      refreshCart
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        refreshCart
      );
    };
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="container-shop min-h-[600px] py-12">
        <h1 className="text-2xl font-bold">
          Shopping Cart
        </h1>

        <div className="mt-10 rounded-xl border p-10 text-center">
          <h2 className="text-xl font-bold">
            Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Looks like you haven't added anything to
            your cart yet.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-[#004D40] px-7 py-3 text-xs font-semibold text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-shop py-10">
      <h1 className="text-2xl font-bold">
        Shopping Cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* ITEMS */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border p-4"
            >
              <div className="h-24 w-24 shrink-0 rounded-lg bg-[#f6f6f6]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain p-3"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="font-semibold">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  ${item.price.toFixed(2)}
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    className="grid h-7 w-7 place-items-center rounded-full border"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="text-sm">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    className="grid h-7 w-7 place-items-center rounded-full border"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <strong>
                  $
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </strong>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-red-500"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="h-fit rounded-xl border p-6">
          <h2 className="text-lg font-bold">
            Order Summary
          </h2>

          <div className="mt-5 space-y-3 border-b pb-5 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="mt-5 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-[#004D40] py-3 text-center text-sm font-semibold text-white"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}