"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState<string>(
    searchParams.get("filter") || ""
  );

  const handleFilterClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl);
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl);
    }
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map(({ value, name }) => (
        <Button
          onClick={() => handleFilterClick(value)}
          key={value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === value ? "bg-primary-100 text-primary-500" : "bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:hover:bg-dark-200"}`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
