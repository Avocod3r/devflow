import type { Metadata } from "next";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/question.action";
import { URLProps } from "@/types";

export async function generateMetadata({
  params,
}: URLProps): Promise<Metadata> {
  const tagId = params.id;

  const { tagTitle } = await getQuestionsByTagId({ tagId });

  return {
    title: `${tagTitle.toUpperCase()} | Dev Overflow`,
  };
}

const Page = async ({
  params: { id: tagId },
  searchParams,
}: URLProps) => {
  const { tagTitle, questions, isNext } = await getQuestionsByTagId({
    tagId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 7,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 capitalize">
        {tagTitle.toUpperCase()}
      </h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${tagId}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          classNames="flex-1"
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
            title="There's no  questions to show"
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

export default Page;
