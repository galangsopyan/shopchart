"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearCart, getCart } from "@/lib/cart";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: MidtransResult) => void;
          onPending?: (result: MidtransResult) => void;
          onError?: (result: MidtransResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

type MidtransResult = {
  order_id?: string;
  transaction_id?: string;
  transaction_status?: string;
  payment_type?: string;
};

type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
};

type CartItem = {
  id?: string;
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function Checkout() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [snapReady, setSnapReady] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  /*
   * Load Midtrans Snap
   */
  useEffect(() => {
    const clientKey =
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    if (!clientKey) {
      console.error(
        "NEXT_PUBLIC_MIDTRANS_CLIENT_KEY belum tersedia."
      );
      return;
    }

    const scriptUrl =
      "https://app.sandbox.midtrans.com/snap/snap.js";

    const existingScript = document.querySelector(
      `script[src="${scriptUrl}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.snap) {
        setSnapReady(true);
      } else {
        existingScript.addEventListener(
          "load",
          () => setSnapReady(true)
        );
      }

      return;
    }

    const script = document.createElement("script");

    script.src = scriptUrl;
    script.setAttribute(
      "data-client-key",
      clientKey
    );
    script.async = true;

    script.onload = () => {
      console.log("Midtrans Snap berhasil dimuat.");
      setSnapReady(true);
    };

    script.onerror = () => {
      console.error(
        "Gagal memuat Midtrans Snap."
      );
      setSnapReady(false);
    };

    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  function updateCustomer(
    field: keyof Customer,
    value: string
  ) {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handlePayment() {
    try {
      if (loading) {
        return;
      }

      /*
       * Validasi customer
       */

      if (!customer.firstName.trim()) {
        alert("First Name wajib diisi.");
        return;
      }

      if (!customer.lastName.trim()) {
        alert("Last Name wajib diisi.");
        return;
      }

      if (!customer.email.trim()) {
        alert("Email wajib diisi.");
        return;
      }

      if (!customer.phone.trim()) {
        alert("Nomor handphone wajib diisi.");
        return;
      }

      if (!customer.address.trim()) {
        alert("Address wajib diisi.");
        return;
      }

      if (!customer.city.trim()) {
        alert("City / Town wajib diisi.");
        return;
      }

      if (!customer.zipCode.trim()) {
        alert("Zip Code wajib diisi.");
        return;
      }

      /*
       * Pastikan Snap sudah tersedia
       */

      if (!window.snap || !snapReady) {
        alert(
          "Payment system belum siap. Silakan tunggu beberapa detik lalu coba lagi."
        );
        return;
      }

      /*
       * Ambil cart
       */

      const cart = getCart() as CartItem[];

      if (!cart || cart.length === 0) {
        alert("Cart kosong.");
        return;
      }

      /*
       * Validasi dan normalisasi cart
       */

      const items = cart.map((item) => ({
        id: item.id,
        productId:
          item.productId || item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image,
      }));

      for (const item of items) {
        if (
          !item.name ||
          !Number.isFinite(item.price) ||
          item.price <= 0 ||
          !Number.isInteger(item.quantity) ||
          item.quantity <= 0
        ) {
          alert(
            "Data produk di cart tidak valid."
          );
          return;
        }
      }

      setLoading(true);

      /*
       * Buat transaksi di server
       */

      const response = await fetch(
        "/api/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,

            firstName:
              customer.firstName.trim(),

            lastName:
              customer.lastName.trim(),

            email:
              customer.email.trim(),

            phone:
              customer.phone.trim(),

            address:
              customer.address.trim(),

            city:
              customer.city.trim(),

            zipCode:
              customer.zipCode.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Gagal membuat pembayaran."
        );
      }

      if (!data.snapToken) {
        throw new Error(
          "Token pembayaran Midtrans tidak ditemukan."
        );
      }

      if (!data.orderNumber) {
        throw new Error(
          "Order number tidak ditemukan."
        );
      }

      /*
       * Buka Midtrans Snap
       */

      window.snap.pay(
        data.snapToken,
        {
          /*
           * PEMBAYARAN BERHASIL
           */

          onSuccess: (result) => {
            console.log(
              "Midtrans payment success:",
              result
            );

            /*
             * Cart dihapus setelah pembayaran berhasil
             */

            clearCart();

            setLoading(false);

            /*
             * Redirect ke halaman success
             *
             * PENTING:
             * Jangan gunakan example.com.
             *
             * Kita redirect ke halaman Next.js
             * sendiri.
             */

            const orderId =
              result?.order_id ||
              data.orderNumber;

            router.push(
              `/checkout/success?order_id=${encodeURIComponent(
                orderId
              )}&status=success`
            );
          },

          /*
           * PEMBAYARAN PENDING
           */

          onPending: (result) => {
            console.log(
              "Midtrans payment pending:",
              result
            );

            setLoading(false);

            const orderId =
              result?.order_id ||
              data.orderNumber;

            /*
             * Cart JANGAN dihapus
             * karena pembayaran belum selesai.
             */

            router.push(
              `/checkout/success?order_id=${encodeURIComponent(
                orderId
              )}&status=pending`
            );
          },

          /*
           * PEMBAYARAN ERROR
           */

          onError: (result) => {
            console.error(
              "Midtrans payment error:",
              result
            );

            setLoading(false);

            alert(
              "Pembayaran gagal. Silakan coba lagi."
            );
          },

          /*
           * USER MENUTUP POPUP
           */

          onClose: () => {
            console.log(
              "User menutup Midtrans popup."
            );

            setLoading(false);
          },
        }
      );
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Tidak dapat memproses pembayaran."
      );

      setLoading(false);
    }
  }

  return (
    <main className="container-shop py-6">
      {/* BREADCRUMB */}

      <div className="mb-5 text-[9px] text-neutral-500">
        Home /{" "}
        <b className="text-neutral-800">
          Checkout
        </b>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_.9fr]">
        {/* LEFT */}

        <div>
          {/* REVIEW ITEM */}

          <section className="rounded-md border p-5">
            <h1 className="text-lg font-bold">
              Review Item And Shipping
            </h1>

            <div className="mt-5 flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1625245488600-8c7b4b1e7e6a?auto=format&fit=crop&w=300&q=80"
                className="h-28 w-28 rounded-md bg-neutral-100 object-cover"
                alt="Airpods Max"
              />

              <div className="flex-1">
                <h2 className="font-bold">
                  Airpods Max
                </h2>

                <p className="mt-2 text-[10px] text-neutral-500">
                  Color: Pink
                </p>

                <p className="text-[10px] text-neutral-500">
                  Quantity: 01
                </p>
              </div>

              <b>Rp549.000</b>
            </div>
          </section>

          {/* DELIVERY */}

          <section className="mt-4 rounded-md border p-5">
            <h2 className="text-lg font-bold">
              Delivery Information
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* FIRST NAME */}

              <label>
                <span className="mb-2 block text-[10px] font-semibold">
                  First Name*
                </span>

                <input
                  value={customer.firstName}
                  onChange={(e) =>
                    updateCustomer(
                      "firstName",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="Type here..."
                />
              </label>

              {/* LAST NAME */}

              <label>
                <span className="mb-2 block text-[10px] font-semibold">
                  Last Name*
                </span>

                <input
                  value={customer.lastName}
                  onChange={(e) =>
                    updateCustomer(
                      "lastName",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="Type here..."
                />
              </label>

              {/* ADDRESS */}

              <label className="sm:col-span-2">
                <span className="mb-2 block text-[10px] font-semibold">
                  Address*
                </span>

                <input
                  value={customer.address}
                  onChange={(e) =>
                    updateCustomer(
                      "address",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="Type here..."
                />
              </label>

              {/* CITY */}

              <label>
                <span className="mb-2 block text-[10px] font-semibold">
                  City / Town*
                </span>

                <input
                  value={customer.city}
                  onChange={(e) =>
                    updateCustomer(
                      "city",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="Type here..."
                />
              </label>

              {/* ZIP CODE */}

              <label>
                <span className="mb-2 block text-[10px] font-semibold">
                  Zip Code*
                </span>

                <input
                  value={customer.zipCode}
                  onChange={(e) =>
                    updateCustomer(
                      "zipCode",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="Type here..."
                />
              </label>

              {/* PHONE */}

              <label>
                <span className="mb-2 block text-[10px] font-semibold">
                  Mobile*
                </span>

                <input
                  value={customer.phone}
                  onChange={(e) =>
                    updateCustomer(
                      "phone",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="08xxxxxxxxxx"
                />
              </label>

              {/* EMAIL */}

              <label>
                <span className="mb-2 block text-[10px] font-semibold">
                  Email*
                </span>

                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    updateCustomer(
                      "email",
                      e.target.value
                    )
                  }
                  className="h-9 w-full rounded-sm border px-3 text-[10px] outline-none focus:border-forest"
                  placeholder="email@example.com"
                />
              </label>
            </div>
          </section>
        </div>

        {/* RIGHT */}

        <aside className="h-fit rounded-md border p-5">
          <h2 className="text-lg font-bold">
            Order Summary
          </h2>

          <div className="mt-5 border-t pt-5">
            <div className="flex justify-between text-xs">
              <span>Subtotal</span>
              <b>Rp549.000</b>
            </div>

            <div className="mt-3 flex justify-between text-xs">
              <span>Shipping</span>
              <b>Rp0</b>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rp549.000</span>
              </div>
            </div>

            {/* PAYMENT */}

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading || !snapReady}
              className="mt-5 w-full rounded-full bg-forest py-3 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Preparing Payment..."
                : !snapReady
                ? "Loading Payment..."
                : "Pay Rp549.000"}
            </button>

            <p className="mt-3 text-center text-[9px] text-neutral-500">
              Secure payment powered by Midtrans
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}