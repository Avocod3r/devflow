import React from "react";
import Link from "next/link";
import Image from "next/image";
import FilterSelect from "@/components/shared/filterselect/FilterSelect";
import Pagination from "@/components/shared/Pagination";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";
import { getAnswers } from "@/lib/actions/answer.action";
import { getTimeStamp } from "@/lib/utils";
import { AnswerFilters } from "@/constants/filters";

type AllAnswersProps = {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
};

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  filter,
  page = "1",
}: AllAnswersProps) => {
  const { answers, isNext } = await getAnswers({
    questionId,
    sortBy: filter,
    page: +page,
    pageSize: 10,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} Answers
        </h3>
        <FilterSelect
          filters={AnswerFilters}
          filterName="Filter Answers by..."
        />
      </div>
      <div>
        {answers &&
          answers.map((answer) => (
            <article
              key={answer._id}
              className="light-border border-b py-10"
            >
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="User Picture"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      answered {getTimeStamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={userId}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(
                      JSON.parse(userId)
                    )}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(
                      JSON.parse(userId)
                    )}
                  />
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          ))}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={+page} isNext={isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
