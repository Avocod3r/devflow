"use client";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/constants";

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:bg-dark-200 dark:data-[state=open]:bg-dark-200">
        {mode === "light" ? (
          <Image
            src="/assets/icons/sun.svg"
            alt="sun"
            width={20}
            height={20}
            className="active-theme"
          />
        ) : (
          <Image
            src="/assets/icons/moon.svg"
            alt="moon"
            width={20}
            height={20}
            className="active-theme"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="background-light900_dark300 absolute -right-8 z-50 mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400">
        {themes.map(({ label, value, icon }) => (
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-800 dark:focus:bg-dark-400"
            key={value}
            onClick={() => {
              setMode(value);

              if (value !== "system") {
                localStorage.theme = value;
              } else {
                localStorage.removeItem("theme");
              }
            }}
          >
            <Image
              src={icon}
              width={16}
              height={16}
              alt={value}
              className={mode === value ? "active-theme" : ""}
            />
            <p
              className={`body-semibold text-light-500 ${mode === value ? "text-primary-500" : "text-dark100_light900"}`}
            >
              {label}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
