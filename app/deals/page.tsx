import ProductCard from "@/components/ProductCard";

const deals = [
  {
    name: "Wireless Earbuds, IPX8",
    price: "$59.00",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "AirPods Max",
    price: "$499.00",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bose BT Earphones",
    price: "$199.00",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Gaming Headphone",
    price: "$159.00",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=80",
  },
];

export default function DealsPage() {
  return (
    <main className="container-shop py-10">
      <div className="rounded-xl bg-[#f5eee5] px-6 py-10 md:px-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#004D40]">
          Limited Time
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-[#004D40] md:text-4xl">
          Today's Best Deals
        </h1>

        <p className="mt-3 max-w-lg text-sm text-neutral-600">
          Save more on selected products and discover amazing offers.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-bold">
        Deals For You
      </h2>

      <div className="product-grid mt-5">
        {deals.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </main>
  );
}