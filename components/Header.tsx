"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBasket,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

import { getCartCount } from "@/lib/cart";

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Furniture",
  "Travel",
  "Beauty",
  "Sneakers",
];

export default function Header() {
  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [cartCount, setCartCount] =
    useState(0);

  /*
   * UPDATE CART COUNT
   */
  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartCount());
    };

    updateCart();

    window.addEventListener(
      "cart-updated",
      updateCart
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        updateCart
      );
    };
  }, []);

  /*
   * SEARCH
   */
  function handleSearch(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      return;
    }

    window.location.href = `/shop?search=${encodeURIComponent(
      keyword
    )}`;
  }

  /*
   * CLOSE MOBILE MENU
   */
  function closeMobileMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* TOP BORDER */}
      <div className="border-t-[3px] border-[#004D40]">
        {/* MAIN NAVBAR */}
        <div className="container-shop flex h-[60px] items-center gap-5">
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-[18px] font-extrabold text-[#004D40]"
          >
            <ShoppingBasket
              size={25}
              strokeWidth={2.4}
            />

            <span>Shopcart</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 text-[11px] md:flex">
            {/* CATEGORIES */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setCategoryOpen(!categoryOpen)
                }
                className="flex items-center gap-1 hover:text-[#004D40]"
              >
                Categories

                <ChevronDown
                  size={12}
                  className={`transition-transform ${
                    categoryOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 top-8 z-50 w-44 rounded-lg border bg-white p-2 shadow-xl">
                  {categories.map(
                    (category) => (
                      <Link
                        key={category}
                        href={`/categories?category=${encodeURIComponent(
                          category
                        )}`}
                        onClick={() =>
                          setCategoryOpen(false)
                        }
                        className="block rounded-md px-3 py-2.5 text-xs hover:bg-[#f3f7f5] hover:text-[#004D40]"
                      >
                        {category}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {/* DEALS */}
            <Link
              href="/deals"
              className="hover:text-[#004D40]"
            >
              Deals
            </Link>

            {/* WHAT'S NEW */}
            <Link
              href="/new-arrivals"
              className="hover:text-[#004D40]"
            >
              What's New
            </Link>

            {/* DELIVERY */}
            <Link
              href="/delivery"
              className="hover:text-[#004D40]"
            >
              Delivery
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-4">
            {/* SEARCH DESKTOP */}
            <form
              onSubmit={handleSearch}
              className="hidden w-[190px] items-center gap-2 rounded-full bg-[#f5f5f5] px-3 py-2 lg:flex"
            >
              <Search
                size={14}
                className="shrink-0 text-neutral-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search Product"
                className="w-full bg-transparent text-[10px] outline-none"
              />
            </form>

            {/* ACCOUNT */}
            <Link
              href="/account"
              className="hidden items-center gap-1.5 text-[11px] hover:text-[#004D40] sm:flex"
            >
              <UserRound size={16} />

              <span>Account</span>
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-[11px] hover:text-[#004D40]"
            >
              <ShoppingCart size={17} />

              <span className="hidden sm:inline">
                Cart
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#004D40] px-1 text-[8px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t bg-white px-5 py-5 md:hidden">
            {/* MOBILE SEARCH */}
            <form
              onSubmit={(e) => {
                handleSearch(e);
                closeMobileMenu();
              }}
              className="mb-5 flex items-center gap-2 rounded-full bg-[#f5f5f5] px-4 py-3"
            >
              <Search
                size={15}
                className="text-neutral-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search Product"
                className="w-full bg-transparent text-xs outline-none"
              />
            </form>

            {/* MOBILE NAV */}
            <nav className="flex flex-col">
              {/* CATEGORIES */}
              <Link
                href="/categories"
                onClick={closeMobileMenu}
                className="border-b py-3 text-sm"
              >
                Categories
              </Link>

              {/* DEALS */}
              <Link
                href="/deals"
                onClick={closeMobileMenu}
                className="border-b py-3 text-sm"
              >
                Deals
              </Link>

              {/* WHAT'S NEW */}
              <Link
                href="/new-arrivals"
                onClick={closeMobileMenu}
                className="border-b py-3 text-sm"
              >
                What's New
              </Link>

              {/* DELIVERY */}
              <Link
                href="/delivery"
                onClick={closeMobileMenu}
                className="border-b py-3 text-sm"
              >
                Delivery
              </Link>

              {/* ACCOUNT */}
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="border-b py-3 text-sm"
              >
                Account
              </Link>

              {/* CART */}
              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="relative flex items-center gap-2 py-3 text-sm"
              >
                <ShoppingCart size={17} />

                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#004D40] px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}