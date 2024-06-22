import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterSelectProps = {
  filters: {
    name: string;
    value: string;
  }[];
  classNames?: string;
  containerClassNames?: string;
  filterName?: string;
};

const FilterSelect = ({
  filterName = "Select a filter...",
  filters,
  classNames = "",
  containerClassNames = "",
}: FilterSelectProps) => {
  return (
    <div className={`relative ${containerClassNames}`}>
      <Select>
        <SelectTrigger
          className={`${classNames} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 focus-visible:ring-0`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={filterName} />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 text-dark500_light700">
          {filters.map(({ name, value }) => (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
