"use client";

import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import Link from "next/link";

type ProductCardProps = {
  id?: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  rating?: number;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  description = "Organic Cotton, fairtrade certified",
  rating = 5,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const productId =
    id ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

  const numericPrice = Number(
    price.replace(/[^0-9.]/g, "")
  );

  function handleAddToCart() {
    addToCart({
      id: productId,
      name,
      price: numericPrice,
      image,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <div className="group min-w-0">
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f6f6f6]">
        <Link href={`/product/${productId}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* WISHLIST */}
        <button
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm"
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </div>

      {/* INFO */}
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${productId}`}
            className="line-clamp-2 text-[12px] font-semibold hover:text-[#004D40]"
          >
            {name}
          </Link>

          <span className="shrink-0 text-[11px] font-bold">
            ${numericPrice.toFixed(2)}
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-[9px] text-neutral-500">
          {description}
        </p>

        {/* RATING */}
        <div className="mt-1 flex items-center gap-1">
          <span className="text-[11px] tracking-tight text-green-600">
            {"★".repeat(rating)}
          </span>

          <span className="text-[9px] text-neutral-500">
            (121)
          </span>
        </div>

        {/* ADD CART */}
        <button
          onClick={handleAddToCart}
          className={`mt-2 flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[10px] font-medium transition ${
            added
              ? "border-[#004D40] bg-[#004D40] text-white"
              : "border-neutral-400 bg-white text-neutral-800 hover:border-[#004D40] hover:text-[#004D40]"
          }`}
        >
          {added ? (
            <>
              <Check size={13} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={13} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}