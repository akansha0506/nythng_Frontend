"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FilterSection = ({ onFilterChange, onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
      <Select
        onValueChange={(value) => onFilterChange("concern", value)}
      >
        <SelectTrigger className="w-full md:w-[30%]">
          <SelectValue placeholder="Shop by Concern" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="hydration">Hydration</SelectItem>
          <SelectItem value="aging">Aging</SelectItem>
          <SelectItem value="dryness">Dryness</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => onFilterChange("ingredient", value)}
      >
        <SelectTrigger className="w-full md:w-[30%]">
          <SelectValue placeholder="Select Ingredient" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="retinol">Retinol</SelectItem>
          <SelectItem value="vitamin-c">Vitamin C</SelectItem>
          <SelectItem value="hyaluronic">
            Hyaluronic Acid
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="w-full md:w-[35%] rounded-full flex justify-center items-center bg-[#F8F7F7] border">
        <Input
          type="search"
          placeholder="Search by name"
          className="bg-transparent! border-none focus-visible:ring-[px]"
          onChange={(e) => onSearch(e.target.value)}
        />

        <Search className="mr-2 text-gray-600" />
      </div>
    </div>
  );
};

export default FilterSection;