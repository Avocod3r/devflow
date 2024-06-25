import { auth } from "@clerk/nextjs/server";
import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";

const Page = async ({ params }: URLProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9"></div>
      <QuestionForm
        type="edit"
        mongoUserId={mongoUser._id}
        questionDetails={JSON.stringify(result)}
      />
    </>
  );
};

export default Page;
