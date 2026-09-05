import { Truck, PackageCheck, MapPin } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your products delivered quickly and safely.",
  },
  {
    icon: PackageCheck,
    title: "Order Tracking",
    description:
      "Track your order from our warehouse to your door.",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description:
      "We deliver to many locations across Indonesia.",
  },
];

export default function DeliveryPage() {
  return (
    <main className="container-shop py-10">
      <h1 className="text-3xl font-extrabold">
        Delivery Information
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Everything you need to know about Shopcart delivery.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="rounded-xl border p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e8f3f0] text-[#004D40]">
                <Icon size={23} />
              </div>

              <h2 className="mt-6 text-lg font-bold">
                {service.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}