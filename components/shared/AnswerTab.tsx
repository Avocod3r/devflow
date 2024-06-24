import AnswerCard from "@/components/card/AnswerCard";
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
  const { answers } = await getUserAnswers({ userId });

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
    </>
  );
};

export default AnswerTab;
