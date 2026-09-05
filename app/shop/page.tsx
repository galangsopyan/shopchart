import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";

const products = [
  {
    name: "Wireless Earbuds, IPX8",
    price: "$89.00",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "AirPods Max",
    price: "$559.00",
    image:
      "https://images.unsplash.com/photo-1625245488600-8c7b4b1e7e6a?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bose BT Earphones",
    price: "$289.00",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "VIVEFOX Headphones",
    price: "$39.00",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Gaming Headphone",
    price: "$239.00",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: 'Macbook pro 13"',
    price: "$1099.00",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "HomePod mini",
    price: "$59.00",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Laptop sleeve MacBook",
    price: "$59.00",
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Shop() {
  return (
    <main className="container-shop py-7">
      {/* =========================
          HERO / ADVERTISEMENT
      ========================== */}
      <div className="overflow-hidden rounded-md bg-[#faf1e6]">
        <div className="grid min-h-[168px] items-center md:grid-cols-[1fr_.8fr]">
          <div className="px-8 py-8 md:px-14">
            <h1 className="max-w-[360px] text-3xl font-extrabold leading-[1.1] text-forest">
              Grab Upto 50% Off On Selected Headphone
            </h1>

            <button className="mt-4 rounded-full bg-forest px-5 py-2.5 text-[10px] font-semibold text-white transition hover:opacity-90">
              Buy Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
            alt="Headphones"
            className="hidden h-[168px] w-full object-cover md:block"
          />
        </div>
      </div>

      {/* =========================
          FILTERS
      ========================== */}
      <div className="mt-8">
        <ShopFilters />
      </div>

      {/* =========================
          TITLE
      ========================== */}
      <h1 className="mt-7 text-xl font-bold">
        Headphones For You!
      </h1>

      {/* =========================
          PRODUCTS
      ========================== */}
      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            id={product.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </main>
  );
}