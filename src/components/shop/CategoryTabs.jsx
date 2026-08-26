"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  Gem,
  Crown,
  Leaf,
} from "lucide-react";

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,

  activeConcern,
  onConcernChange,

  concerns,

  price,
  setPrice,
  maxPrice,
}) => {
  const categories = [
    {
      label: "All",
      value: "all",
      icon: LayoutGrid,
    },
    {
      label: "Featured",
      value: "featured",
      icon: Gem,
    },
    {
      label: "Best Seller",
      value: "best seller",
      icon: Crown,
    },
    {
      label: "New Arrival",
      value: "new arrival",
      icon: Leaf,
    },
  ];

  return (
    <div className="w-full lg:w-[290px] shrink-0">
      <div
        className="
          sticky
          top-28
          rounded-[30px]
          bg-white
          border
          border-[#E5ECEC]
          shadow-[0_15px_40px_rgba(53,84,84,.08)]
          p-6
        "
      >
        {/* Header */}

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#EEF7F6] flex items-center justify-center">
            <SlidersHorizontal
              size={20}
              className="text-[#70A3A1]"
            />
          </div>

          <div>
            <h2 className="font-semibold text-xl text-[#355454]">
              Filters
            </h2>

            <p className="text-sm text-[#91A4A3]">
              Browse Products
            </p>
          </div>
        </div>

        {/* Concern */}

        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#355454] mb-4 mt-4">
          Concern
        </h3>

        <div className="flex flex-col gap-3 w-full">
          {concerns
            .filter((item) => item.value !== "all")
            .map((item) => (
              <button
                key={item.value}
                onClick={() => onConcernChange(item.value)}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-5
                  py-4
                  border
                  transition-all
                  duration-300
                  ${
                    activeConcern === item.value
                      ? "bg-[#70A3A1] border-[#70A3A1] text-white shadow-lg"
                      : "bg-[#FBFCFC] border-[#E6EEEE] text-[#355454] hover:bg-[#70A3A1] hover:border-[#70A3A1] hover:text-white hover:shadow-lg"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  {item.label}
                </span>

                <div className="w-4 h-4 rounded-full border border-current" />
              </button>
            ))}
        </div>

        {/* Categories */}

        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#355454] mb-4 mt-6">
          Categories
        </h3>

        <Tabs
          value={activeCategory}
          onValueChange={onCategoryChange}
          orientation="vertical"
        >
          <TabsList className="bg-transparent flex flex-col gap-3 h-auto p-0 w-full">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="
                    w-full
                    justify-between
                    rounded-2xl
                    px-5
                    py-4
                    border
                    border-[#E6EEEE]
                    bg-[#FBFCFC]
                    text-[#355454]
                    transition-all
                    duration-300
                    data-[state=active]:bg-[#70A3A1]
                    data-[state=active]:text-white
                    data-[state=active]:border-[#70A3A1]
                    data-[state=active]:shadow-lg
                    hover:border-[#70A3A1]
                  "
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {category.label}
                  </span>

                  <div
                    className="
                      w-4
                      h-4
                      rounded-full
                      border
                      border-current
                    "
                  />
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Divider */}

        <div className="h-px bg-[#EEF3F3] my-8" />

        {/* Reset */}

        <button
          onClick={() => {
            onCategoryChange("all");
            onConcernChange("all");
            setPrice(maxPrice);
          }}
          className="
            w-full
            mt-10
            rounded-full
            py-3
            bg-[#EEF7F6]
            hover:bg-[#70A3A1]
            hover:text-white
            transition-all
            flex
            items-center
            justify-center
            gap-2
            text-[#355454]
          "
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;