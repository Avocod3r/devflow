"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "frequent";
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map(({ value, name }) => (
        <Button
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
