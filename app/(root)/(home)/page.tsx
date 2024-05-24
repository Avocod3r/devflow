import FilterSelect from "@/components/shared/filterselect/FilterSelect";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import HomeFilters from "@/components/home/HomeFilters";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const QuestionCardItems = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [
      {
        _id: 1,
        name: "Next.JS",
      },
      {
        _id: 2,
        name: "React",
      },
    ],
    views: 14020,
    answers: [],
    upvotes: 1000,
    createdAt: new Date("2024-01-04"),
    author: {
      _id: 1,
      name: "Andrii Otroshenko",
      picture: "/assets/images/default-logo.svg",
    },
  },
  {
    _id: 2,
    title: "Redux Toolkit Not Updating State as Expected",
    tags: [
      {
        _id: 3,
        name: "Redux",
      },
      {
        _id: 2,
        name: "React",
      },
    ],
    author: {
      _id: 1,
      name: "Andrii Otroshenko",
      picture: "/assets/images/default-logo.svg",
    },
    views: 1567892,
    answers: [], // Adjusted the structure to match Array<Object>
    upvotes: 41982,
    createdAt: new Date("2024-02-07"),
  },
  {
    _id: 3,
    title: "Async/Await Function Not Handling Errors Properly",
    tags: [
      {
        _id: 4,
        name: "Fetch",
      },
    ],
    author: {
      _id: 1,
      name: "Andrii Otroshenko",
      picture: "/assets/images/default-logo.svg",
    },
    views: 278,
    answers: [], // Adjusted the structure to match Array<Object>
    upvotes: 24,
    createdAt: new Date("2024-03-24"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full  flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          All Questions
        </h1>
        <Link
          className="flex justify-end max-sm:w-full"
          href="/ask-question"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          classNames="flex-1"
        />
        <FilterSelect
          filterName="Filter questions"
          filters={HomePageFilters}
          classNames="min-h-[56px] sm:min-w-[170px]"
          containerClassNames="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {QuestionCardItems.length > 0 ? (
          QuestionCardItems.map(
            ({
              _id,
              title,
              tags,
              author,
              upvotes,
              views,
              answers,
              createdAt,
            }) => (
              <QuestionCard
                key={_id}
                _id={_id}
                title={title}
                tags={tags}
                author={author}
                upvotes={upvotes}
                views={views}
                answers={answers}
                createdAt={createdAt}
              />
            )
          )
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and
        kickstart the discussion. our query could be the next big
        thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
