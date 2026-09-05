import Link from "next/link";
import { ChevronRight, Minus, Plus, Star, Truck, RotateCcw } from "lucide-react";

export default function ProductPage(){
 return <main className="container-shop py-5">
   <div className="mb-5 flex items-center gap-2 text-[9px] text-neutral-500">Electronics <ChevronRight size={11}/> Audio <ChevronRight size={11}/> Headphones <ChevronRight size={11}/> Shop Headphones by type <ChevronRight size={11}/> <b className="text-neutral-800">airpods-max</b></div>
   <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr]">
     <div>
       <div className="overflow-hidden rounded-md bg-[#f7f7f7]"><img src="https://images.unsplash.com/photo-1625245488600-8c7b4b1e7e6a?auto=format&fit=crop&w=1100&q=90" alt="AirPods Max" className="aspect-square w-full object-cover"/></div>
       <div className="mt-3 grid grid-cols-4 gap-3">
        {[1,2,3,4].map(i=><div key={i} className="overflow-hidden rounded-md bg-[#f7f7f7]"><img src={`https://images.unsplash.com/photo-${["1625245488600-8c7b4b1e7e6a","1505740420928-5e560c06d30e","1583394838336-acd977736f90","1590658268037-6bf12165a8df"][i-1]}?auto=format&fit=crop&w=300&q=80`} className="aspect-square w-full object-cover" alt=""/></div>)}
       </div>
     </div>
     <div>
       <h1 className="text-3xl font-extrabold">Airpods- Max</h1>
       <p className="mt-2 text-[10px] leading-4 text-neutral-500">a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.</p>
       <div className="mt-2 text-[11px] text-green-600">★★★★★ <span className="text-neutral-500">(121)</span></div>
       <div className="my-5 border-y py-5"><p className="text-lg font-bold">$549.00 or 99.99/month</p><p className="mt-1 text-[9px] text-neutral-500">Suggested payments with 6 months special financing</p></div>
       <p className="text-sm font-semibold">Choose a Color</p>
       <div className="mt-3 flex gap-3">{["#f7c7c7","#343434","#dfe5dc","#dedfe3","#31506a"].map(c=><span key={c} style={{background:c}} className="h-7 w-7 rounded-full border-2 border-white ring-1 ring-neutral-300"/>)}</div>
       <div className="my-6 flex items-center gap-5 border-y py-5"><div className="flex items-center gap-5 rounded-full bg-[#f7f7f7] px-4 py-2 text-sm"><Minus size={14}/><span>1</span><Plus size={14}/></div><span className="text-[10px]">Only <b className="text-orange-500">12 Items</b> Left!</span></div>
       <div className="flex gap-3"><button className="flex-1 rounded-full bg-forest py-3 text-xs font-semibold text-white">Buy Now</button><button className="flex-1 rounded-full border border-forest py-3 text-xs font-semibold text-forest">Add to Cart</button></div>
       <div className="mt-5 divide-y rounded-md border">
         <div className="flex gap-3 p-4"><Truck size={16} className="text-orange-500"/><div><b className="text-[11px]">Free Delivery</b><p className="text-[9px] text-neutral-500">Enter your postal code for Delivery Availability</p></div></div>
         <div className="flex gap-3 p-4"><RotateCcw size={16} className="text-orange-500"/><div><b className="text-[11px]">Return Delivery</b><p className="text-[9px] text-neutral-500">Free 30days Delivery Returns. Details</p></div></div>
       </div>
     </div>
   </div>
   <h2 className="mt-14 text-sm font-bold">Apple AirPods Max Wireless Headphones Full Specifications</h2>
 </main>
}