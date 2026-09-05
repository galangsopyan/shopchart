"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    title: "Shopping And",
    title2: "Department Store.",
    description:
      "Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.",
    button: "Learn More",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Grab Upto 50% Off",
    title2: "Selected Headphone",
    description:
      "Upgrade your listening experience with premium headphones at special prices.",
    button: "Buy Now",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Discover New",
    title2: "Tech Collection.",
    description:
      "Find the latest gadgets, electronics and accessories for your everyday life.",
    button: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const banner = banners[active];

  function previous() {
    setActive((current) =>
      current === 0 ? banners.length - 1 : current - 1
    );
  }

  function next() {
    setActive((current) => (current + 1) % banners.length);
  }

  return (
    <section className="relative overflow-hidden bg-[#dff3f5]">
      <div className="container-shop relative">
        <div className="grid min-h-[350px] items-center gap-6 py-8 md:min-h-[400px] md:grid-cols-[.9fr_1.1fr] md:py-10">

          {/* TEXT */}
          <div className="relative z-10 max-w-[520px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#004D40]">
              Shopcart Collection
            </p>

            <h1 className="text-3xl font-extrabold leading-[1.05] text-[#004D40] sm:text-4xl md:text-5xl">
              {banner.title}
              <br />
              {banner.title2}
            </h1>

            <p className="mt-5 max-w-md text-xs leading-6 text-neutral-600 sm:text-sm">
              {banner.description}
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-[#004D40] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#00372f]"
            >
              {banner.button}
            </Link>
          </div>

          {/* IMAGE */}
          <div className="relative h-[230px] overflow-hidden rounded-xl sm:h-[280px] md:h-[330px]">
            <img
              key={banner.image}
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover transition-all duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
          </div>
        </div>

        {/* PREVIOUS */}
        <button
          onClick={previous}
          className="absolute left-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md transition hover:bg-white md:left-3"
        >
          <ChevronLeft size={18} />
        </button>

        {/* NEXT */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md transition hover:bg-white md:right-3"
        >
          <ChevronRight size={18} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all ${
                index === active
                  ? "w-6 bg-[#004D40]"
                  : "w-2 bg-white"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}