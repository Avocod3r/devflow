import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/question.action";
import { URLProps } from "@/types";

const Page = async ({
  params: { id: tagId },
  searchParams,
}: URLProps) => {
  const { tagTitle, questions } = await getQuestionsByTagId({
    tagId,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 capitalize">
        {tagTitle}
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
    </>
  );
};

export default Page;
