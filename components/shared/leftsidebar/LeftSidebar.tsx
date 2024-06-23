"use client";
import React from "react";
import NavContent from "@/components/shared/navigation/NavContent";
import { SignedOut, SignedIn, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LeftSidebar = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(() => router.push("/"));
  };

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex  h-screen w-fit flex-col justify-between overflow-y-auto  border-r p-6 pt-20 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <NavContent isSideBar />
      <SignedIn>
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSignOut}
            className="small-medium btn-secondary  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
          >
            <span className="primary-text-gradient">Logout</span>
          </Button>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
