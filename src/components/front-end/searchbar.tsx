"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <form className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-12 rounded-full border-gray-300 pr-4 pl-10 text-base"
          placeholder="Tìm kiếm bác sĩ, chuyên khoa..."
          type="text"
        />
      </div>
      <Button
        className="h-12 w-full rounded-full bg-blue-600 px-8 text-gray-50 hover:bg-blue-700 sm:w-auto"
        type="submit"
      >
        Tìm kiếm
      </Button>
    </form>
  );
}
