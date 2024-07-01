import QuestionCard from "@/components/card/QuestionCard";
import Pagination from "@/components/shared/Pagination";
import { getUserQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const { questions, isNext } = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 5,
  });

  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default QuestionTab;
