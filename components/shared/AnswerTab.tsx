import AnswerCard from "@/components/card/AnswerCard";
import Pagination from "@/components/shared/Pagination";
import { getUserAnswers } from "@/lib/actions/answer.action";
import { SearchParamsProps } from "@/types";

interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}

const AnswerTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswerTabProps) => {
  const { answers, isNext } = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 5,
  });

  return (
    <>
      {answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
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

export default AnswerTab;
