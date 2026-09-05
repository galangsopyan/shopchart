import { ShoppingBasket } from "lucide-react";

const columns = {
  Department:["Fashion","Education Product","Frozen Food","Beverages","Organic Grocery","Office Supplies","Beauty Products","Books","Electronics & Gadget","Travel Accessories","Fitness","Sneakers","Toys","Furniture"],
  "About us":["About shopcart","Careers","News & Blog","Help","Press Center","Shop by location","Shopcart brands","Affiliate & Partners","Ideas & Guides"],
  Services:["Gift Card","Mobile App","Shipping & Delivery","Order Pickup","Account Signup"],
  Help:["Shopcart Help","Returns","Track orders","contact us","feedback","Security & Fraud"]
};

export default function Footer(){
 return <footer className="border-t border-neutral-200 bg-white">
  <div className="container-shop grid gap-12 py-14 lg:grid-cols-[1.15fr_3fr]">
    <div>
      <div className="flex items-center gap-2 text-lg font-extrabold text-forest"><ShoppingBasket size={24}/>Shopcart</div>
      <p className="mt-5 max-w-[240px] text-[10px] leading-4 text-neutral-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
      <p className="mt-8 text-[11px] font-semibold">Accepted Payments</p>
      <div className="mt-3 grid w-[170px] grid-cols-4 gap-2 text-[9px] font-bold">
        {["stripe","VISA","◉","amazon","klarna","PayPal"," Pay","G Pay"].map(x=><span key={x} className="grid h-7 place-items-center rounded border border-neutral-200">{x}</span>)}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {Object.entries(columns).map(([title,links])=><div key={title}><h3 className="text-xs font-semibold">{title}</h3><ul className="mt-4 space-y-2">{links.map(x=><li key={x}><a href="#" className="text-[10px] text-neutral-600 hover:text-forest">{x}</a></li>)}</ul></div>)}
    </div>
  </div>
 </footer>
}