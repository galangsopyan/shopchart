"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

type User = {
  name: string;
  email: string;
};

export default function AccountPage() {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const stored =
      localStorage.getItem("shopcart_user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function logout() {
    localStorage.removeItem("shopcart_user");

    window.dispatchEvent(
      new Event("auth-updated")
    );

    setUser(null);
  }

  if (!user) {
    return (
      <main className="container-shop min-h-[600px] py-12">
        <h1 className="text-3xl font-extrabold">
          My Account
        </h1>

        <div className="mt-8 max-w-[450px] rounded-xl border p-6">
          <h2 className="text-xl font-bold">
            Welcome to Shopcart
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Sign in to manage your account and
            orders.
          </p>

          <Link
            href="/login"
            className="mt-6 block rounded-full bg-[#004D40] py-3 text-center text-sm font-semibold text-white"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="mt-3 block rounded-full border border-[#004D40] py-3 text-center text-sm font-semibold text-[#004D40]"
          >
            Create Account
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-shop min-h-[600px] py-12">
      <h1 className="text-3xl font-extrabold">
        My Account
      </h1>

      <div className="mt-8 max-w-[500px] rounded-xl border p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#e5f1ed] text-lg font-bold text-[#004D40]">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="font-bold">
              {user.name}
            </h2>

            <p className="text-sm text-neutral-500">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-red-300 py-3 text-sm font-semibold text-red-500"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </main>
  );
}