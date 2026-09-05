import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";

const categories = [
  ["Furniture","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],
  ["Hand Bag","https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"],
  ["Books","https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"],
  ["Tech","https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"],
  ["Sneakers","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
  ["Travel","https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"],
];

const products = [
  {name:"Wireless Earbuds, IPX8", price:"$89.00", image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80"},
  {name:"AirPods Max", price:"$559.00", image:"https://images.unsplash.com/photo-1625245488600-8c7b4b1e7e6a?auto=format&fit=crop&w=700&q=80"},
  {name:"Bose BT Earphones", price:"$289.00", image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"},
  {name:"VIVEFOX Headphones", price:"$39.00", image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80"},
];

const popular = [
  {name:"Gaming Headphone", price:"$239.00", image:"https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=80"},
  {name:'Macbook pro 13"', price:"$1099.00", image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80"},
  {name:"HomePod mini", price:"$59.00", image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=700&q=80"},
  {name:"Laptop sleeve MacBook", price:"$59.00", image:"https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80"},
];

export default function HomePage() {
  return (
    <main>

      <HeroCarousel />

      <section className="container-shop py-12">
        <h2 className="mb-6 text-xl font-bold">Shop Our Top Categories</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(([name,img]) => (
            <Link href="/shop" key={name} className="group relative h-40 overflow-hidden rounded-md bg-neutral-100">
              <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/15"/>
              <span className="absolute left-4 top-4 text-sm font-bold text-white">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shop pb-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Todays Best Deals For You!</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {["Gadgets","Fashion","Toys","Education","Beauty","Travel","Fitness","Furniture","Sneakers"].map((x,i)=>(
                <button className={`pill ${i===0?"pill-active":""}`} key={x}>{x}</button>
              ))}
            </div>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 text-xs font-semibold md:flex">View All <ArrowRight size={14}/></Link>
        </div>
        <div className="product-grid">
          {products.map(p=><ProductCard key={p.name} {...p}/>)}
        </div>
      </section>

      <section className="container-shop pb-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Weekly Popular Products</h2>
          <Link href="/shop" className="text-xs font-semibold">View All →</Link>
        </div>
        <div className="product-grid">
          {popular.map(p=><ProductCard key={p.name} {...p}/>)}
        </div>
      </section>

      <section className="container-shop pb-16">
        <div className="section-rule pt-10">
          <h2 className="mb-6 text-xl font-bold">Services To Help You Shop</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Frequently Asked Questions","Updates on safe Shopping in our Stores","https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80"],
              ["Online Payment Process","Updates on safe Shopping in our Stores","https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=700&q=80"],
              ["Home Delivery Options","Updates on safe Shopping in our Stores","https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80"]
            ].map(([title,desc,img])=>(
              <div key={title} className="overflow-hidden rounded-md bg-[#f6f6f6]">
                <div className="p-6"><h3 className="max-w-[230px] text-lg font-bold leading-tight">{title}</h3><p className="mt-5 max-w-[220px] text-xs leading-5 text-neutral-600">{desc}</p></div>
                <img src={img} alt="" className="h-28 w-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}