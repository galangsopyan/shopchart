import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Latest Wireless Earbuds",
    price: "$99.00",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Premium Headphones",
    price: "$299.00",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Macbook Pro 13",
    price: "$1099.00",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Smart HomePod",
    price: "$59.00",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=700&q=80",
  },
];

export default function NewArrivalsPage() {
  return (
    <main className="container-shop py-10">
      <h1 className="text-3xl font-extrabold">
        What's New
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Discover our latest products and collections.
      </p>

      <div className="product-grid mt-8">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </main>
  );
}