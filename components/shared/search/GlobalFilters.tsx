"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [activeType, setActiveType] = useState(typeParams || "");

  const handleClick = (type: string) => {
    if (activeType === type) {
      setActiveType("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActiveType(type);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: type,
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map(({ value, name }) => (
          <button
            type="button"
            key={value}
            onClick={() => handleClick(value)}
            className={`light-border-2 small-medium rounded-2xl border px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500 ${activeType === value ? "bg-primary-500 text-light-700 dark:bg-light-400" : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"} `}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
