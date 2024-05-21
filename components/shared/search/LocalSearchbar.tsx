"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type LocalSearchbarProps = {
  placeholder?: string;
  iconPosition?: "left" | "right";
  route?: string;
  imgSrc?: string;
  classNames?: string;
};

const LocalSearchbar = ({
  placeholder = "",
  iconPosition = "left",
  route = "/",
  imgSrc = "/assets/icons/search.svg",
  classNames = "",
}: LocalSearchbarProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${classNames} ${iconPosition === "right" ? "flex-row-reverse" : ""}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Search icon"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={(event) => {
          console.log(event.currentTarget.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearchbar;
