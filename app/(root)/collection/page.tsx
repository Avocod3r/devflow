import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import FilterSelect from "@/components/shared/filterselect/FilterSelect";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/Pagination";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/sign-up");
  }
  const { questions, isNext } = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        Saved Questions
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          classNames="flex-1"
        />
        <FilterSelect
          filterName="Filter questions"
          filters={QuestionFilters}
          classNames="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no saved questions to show"
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
