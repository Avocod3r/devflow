import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";
import Tag from "@/components/ui/tag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import { URLProps } from "@/types";

export async function generateMetadata({
  params,
}: URLProps): Promise<Metadata> {
  const questionId = params.id;

  const { title } = await getQuestionById({ questionId });

  return {
    title: `${title} | Dev Overflow`,
  };
}

const Page = async ({
  params: { id: questionId },
  searchParams,
}: URLProps) => {
  const { userId } = auth();
  const question = await getQuestionById({
    questionId,
  });

  let mongoUser;
  if (userId) {
    mongoUser = await getUserById({ userId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1"
            href={`/profile/${question.author.clerkId}`}
          >
            <Image
              src={question.author.picture}
              width={22}
              height={22}
              alt="User picture"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(question?._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question.upvotes.length}
              hasUpvoted={question.upvotes.includes(mongoUser?._id)}
              downvotes={question.downvotes.length}
              hasDownvoted={question.downvotes.includes(
                mongoUser?._id
              )}
              hasSaved={mongoUser?.saved.includes(question?._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left ">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="Clock"
          value={` asked ${getTimeStamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map(
          ({ _id, name }: { _id: string; name: string }) => (
            <Tag key={_id}>{name}</Tag>
          )
        )}
      </div>
      <AllAnswers
        userId={JSON.stringify(mongoUser?._id)}
        questionId={question?._id}
        totalAnswers={question.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <AnswerForm
        question={question.content}
        questionId={JSON.stringify(question?._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
};

export default Page;
