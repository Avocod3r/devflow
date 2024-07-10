import type { Metadata } from "next";
import Link from "next/link";
import FilterSelect from "@/components/shared/filterselect/FilterSelect";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import HomeFilters from "@/components/home/HomeFilters";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Home | Dev Overflow",
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { questions, isNext } = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
  });

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
        {questions.length > 0 ? (
          questions.map(
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
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Home;
