"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Semua field wajib diisi."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password minimal 6 karakter."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Konfirmasi password tidak cocok."
      );
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("shopcart_users") ||
        "[]"
    );

    const exists = users.some(
      (user: { email: string }) =>
        user.email === email
    );

    if (exists) {
      setError(
        "Email tersebut sudah terdaftar."
      );
      return;
    }

    users.push({
      name,
      email,
      password,
    });

    localStorage.setItem(
      "shopcart_users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "shopcart_user",
      JSON.stringify({
        name,
        email,
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
            Create Account
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Join Shopcart today
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="text-xs font-semibold">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Your name"
              className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#004D40]"
            />
          </div>

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

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Minimum 6 characters"
              className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#004D40]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Repeat password"
              className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#004D40]"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-[#004D40] py-3 text-sm font-semibold text-white hover:bg-[#00372f]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#004D40]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}