"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

type NavContentProps = {
  isSideBar?: boolean;
};

const NavContent: React.FC<NavContentProps> = ({
  isSideBar = false,
}) => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map(({ route, imgURL, label }) => {
        const isActive =
          (pathname.includes(route) && route.length > 1) ||
          pathname === route;

        if (route === "/profile") {
          if (userId) {
            route = `${route}/${userId}`;
          } else {
            return null;
          }
        }
        return (
          <Link
            key={route}
            href={route}
            className={`
                ${
                  isActive
                    ? "primary-gradient rounded-lg  text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={imgURL}
              width={20}
              height={20}
              alt={label}
              className={`${isActive ? "" : "invert-colors"}`}
            />
            <p
              className={`${isActive ? "base-bold" : "base-medium"} ${isSideBar ? "max-lg:hidden" : ""}`}
            >
              {label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default NavContent;
