import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Travel",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CategoriesPage() {
  return (
    <main className="container-shop py-10">
      <h1 className="text-3xl font-extrabold">
        Shop By Category
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Explore our collection by category.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            className="group relative h-52 overflow-hidden rounded-xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30" />

            <h2 className="absolute bottom-5 left-5 text-xl font-bold text-white">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}