"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ReloadIcon } from "@radix-ui/react-icons";
import GlobalFilters from "@/components/shared/search/GlobalFilters";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      type: "question",
      id: 1,
      title: "Next.JS searcParams underrated",
    },
    {
      type: "tag",
      id: 2,
      title: "Next.JS",
    },
    {
      type: "user",
      id: 3,
      title: "avocoder",
    },
  ]);

  const globalQuery = searchParams.get("global");
  const typeQuery = searchParams.get("type");

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
    setResult([]);
    // const fetchResult = async () => {
    //   setResult([]);
    //   setIsLoading(true);
    //   try {
    //     // FETCH result
    //   } catch (error) {
    //     console.log(error);
    //     throw new Error();
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
  }, [globalQuery, typeQuery]);

  const renderLink = (type: string, id: string) => {
    return "/";
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <GlobalFilters />
      <div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  key={item.type + item.id + index}
                  href={renderLink("type", "itemId")}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    width={18}
                    height={18}
                    alt="Icons"
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oooops, no result found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
