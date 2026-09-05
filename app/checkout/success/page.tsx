import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";

type SuccessPageProps = {
  searchParams: {
    order_id?: string;
    status?: string;
    total?: string;
  };
};

export default function Success({
  searchParams,
}: SuccessPageProps) {
  const orderId =
    searchParams.order_id || "Tidak tersedia";

  const status =
    searchParams.status || "success";

  const isPending = status === "pending";

  const total = searchParams.total
    ? Number(searchParams.total)
    : null;

  const formattedTotal =
    total !== null && Number.isFinite(total)
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(total)
      : null;

  return (
    <main className="min-h-[650px] bg-neutral-100 px-5 py-10">
      <div className="mx-auto flex min-h-[600px] max-w-[480px] items-center justify-center">
        <div className="w-full overflow-hidden rounded-[28px] bg-white shadow-xl">

          {/* HEADER */}
          <div
            className={`relative px-8 py-14 text-center ${
              isPending
                ? "bg-gradient-to-br from-amber-100 via-white to-orange-100"
                : "bg-gradient-to-br from-indigo-100 via-white to-emerald-100"
            }`}
          >
            {/* Decorative circles */}
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/40" />
            <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-white/40" />

            {/* Icon */}
            <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-full bg-white shadow-lg">
              <div
                className={`grid h-24 w-24 place-items-center rounded-full ${
                  isPending
                    ? "bg-amber-400"
                    : "bg-lime-400"
                }`}
              >
                <Check
                  size={52}
                  color="white"
                  strokeWidth={3}
                />
              </div>
            </div>

            <p className="relative mt-5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Shopcart
            </p>
          </div>

          {/* CONTENT */}
          <div className="px-7 pb-8 pt-8 text-center">

            <h1 className="text-2xl font-bold text-neutral-900">
              {isPending ? (
                <>
                  Payment is
                  <br />
                  pending
                </>
              ) : (
                <>
                  Your order has been
                  <br />
                  accepted
                </>
              )}
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              {isPending
                ? "Please complete your payment to process your order."
                : "Thank you! Your payment has been successfully received."}
            </p>

            {/* ORDER INFORMATION */}
            <div className="mt-7 rounded-2xl bg-neutral-50 p-5 text-left">

              <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm">
                  <ShoppingBag
                    size={19}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-[10px] text-neutral-500">
                    Order ID
                  </p>

                  <p className="mt-1 text-sm font-bold text-neutral-900">
                    {orderId}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex items-center justify-between border-b border-neutral-200 py-4">
                <span className="text-xs text-neutral-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                    isPending
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isPending
                    ? "Payment Pending"
                    : "Payment Successful"}
                </span>
              </div>

              {/* TOTAL */}
              {formattedTotal && (
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs text-neutral-500">
                    Total Payment
                  </span>

                  <span className="text-base font-bold text-neutral-900">
                    {formattedTotal}
                  </span>
                </div>
              )}
            </div>

            {/* BUTTON */}
            <Link
              href="/"
              className="mt-7 block w-full rounded-full bg-orange-500 px-7 py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg"
            >
              Continue Shopping
            </Link>

            {/* FOOTER */}
            <p className="mt-5 text-[10px] leading-5 text-neutral-400">
              {isPending
                ? "Your order will be processed after the payment is confirmed."
                : "A confirmation of your order has been recorded by Shopcart."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}