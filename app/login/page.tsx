"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!email || !password) {
      setError(
        "Email dan password wajib diisi."
      );
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("shopcart_users") ||
        "[]"
    );

    const user = users.find(
      (item: {
        email: string;
        password: string;
      }) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      setError(
        "Email atau password tidak benar."
      );
      return;
    }

    localStorage.setItem(
      "shopcart_user",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    window.dispatchEvent(
      new Event("auth-updated")
    );

    router.push("/");
  }

  return (
    <main className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[#fafafa] px-5 py-12">
      <div className="w-full max-w-[430px] rounded-2xl border bg-white p-7 shadow-sm sm:p-9">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-[#004D40]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Sign in to your Shopcart account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="text-xs font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#004D40]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                className="w-full rounded-lg border px-4 py-3 pr-11 text-sm outline-none focus:border-[#004D40]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-[#004D40] py-3 text-sm font-semibold text-white transition hover:bg-[#00372f]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#004D40]"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}