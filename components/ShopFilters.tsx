"use client";

import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const filters = {
  "Headphone Type": [
    "Over Ear",
    "On Ear",
    "In Ear",
    "Wireless",
  ],
  Price: [
    "Under $100",
    "$100 - $300",
    "$300 - $500",
    "Over $500",
  ],
  Review: [
    "4 Stars & Up",
    "3 Stars & Up",
  ],
  Color: [
    "Black",
    "White",
    "Pink",
    "Blue",
    "Red",
  ],
  Material: [
    "Plastic",
    "Metal",
    "Leather",
  ],
  Offer: [
    "On Sale",
    "50% Off",
    "Free Delivery",
  ],
};

export default function ShopFilters() {
  const [openFilter, setOpenFilter] =
    useState<string | null>(null);

  const [selected, setSelected] =
    useState<Record<string, string>>({});

  const [sort, setSort] =
    useState("Featured");

  function selectFilter(
    filter: string,
    value: string
  ) {
    setSelected((current) => ({
      ...current,
      [filter]: value,
    }));

    setOpenFilter(null);
  }

  function clearFilters() {
    setSelected({});
    setOpenFilter(null);
  }

  return (
    <div className="relative z-30 flex w-full items-start gap-3">
      {/* FILTER LIST */}
      <div className="flex min-w-0 flex-1 flex-wrap gap-2">
        {Object.entries(filters).map(
          ([filter, values]) => {
            const isOpen =
              openFilter === filter;

            return (
              <div
                key={filter}
                className="relative"
              >
                {/* BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      isOpen ? null : filter
                    )
                  }
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-2 text-[10px] transition ${
                    selected[filter]
                      ? "border-[#004D40] bg-[#004D40] text-white"
                      : "border-neutral-200 bg-[#f7f7f7] hover:border-[#004D40]"
                  }`}
                >
                  <span>
                    {selected[filter] || filter}
                  </span>

                  <ChevronDown
                    size={11}
                    className={`transition-transform ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {isOpen && (
                  <div className="absolute left-0 top-[calc(100%+8px)] z-[100] w-48 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                    <div className="mb-1 px-3 py-2 text-[10px] font-semibold text-neutral-500">
                      {filter}
                    </div>

                    {values.map((value) => {
                      const active =
                        selected[filter] ===
                        value;

                      return (
                        <button
                          type="button"
                          key={value}
                          onClick={() =>
                            selectFilter(
                              filter,
                              value
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition ${
                            active
                              ? "bg-[#eef6f3] text-[#004D40]"
                              : "hover:bg-[#f5f5f5]"
                          }`}
                        >
                          <span>{value}</span>

                          {active && (
                            <Check
                              size={14}
                              className="text-[#004D40]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
        )}

        {/* ALL FILTERS */}
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1 whitespace-nowrap rounded-full border border-neutral-200 bg-[#f7f7f7] px-3 py-2 text-[10px] hover:border-[#004D40]"
        >
          <SlidersHorizontal size={11} />

          All Filters
        </button>
      </div>

      {/* SORT */}
      <div className="relative hidden shrink-0 sm:block">
        <button
          type="button"
          onClick={() =>
            setOpenFilter(
              openFilter === "sort"
                ? null
                : "sort"
            )
          }
          className="flex items-center gap-1 whitespace-nowrap rounded-full border border-neutral-200 bg-[#f7f7f7] px-3 py-2 text-[10px] hover:border-[#004D40]"
        >
          Sort by: {sort}

          <ChevronDown
            size={11}
            className={`transition-transform ${
              openFilter === "sort"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {openFilter === "sort" && (
          <div className="absolute right-0 top-[calc(100%+8px)] z-[100] w-40 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
            {[
              "Featured",
              "Price Low",
              "Price High",
              "Rating",
              "Newest",
            ].map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => {
                  setSort(value);
                  setOpenFilter(null);
                }}
                className={`block w-full rounded-lg px-3 py-2.5 text-left text-xs ${
                  sort === value
                    ? "bg-[#eef6f3] font-semibold text-[#004D40]"
                    : "hover:bg-[#f5f5f5]"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}