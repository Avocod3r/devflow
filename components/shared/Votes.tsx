"use client";
import { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  downvoteAnswer,
  upvoteAnswer,
} from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
  toggleSaveQuestion,
} from "@/lib/actions/question.action";
import { formatAndDivideNumber } from "@/lib/utils";

type VotesProps = {
  type: "question" | "answer";
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
};

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasDownvoted,
  hasUpvoted,
  hasSaved,
  downvotes,
}: VotesProps) => {
  const path = usePathname();
  const router = useRouter();
  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path,
    });
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, path, router]);

  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) return;

    if (action === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } else if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
      }

      // TODO: show a toast
    } else if (action === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } else if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
      }
      // TODO: show a toast
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={`/assets/icons/${hasUpvoted ? "upvoted.svg" : "upvote.svg"}`}
            width={18}
            height={18}
            alt="Upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={`/assets/icons/${hasDownvoted ? "downvoted.svg" : "downvote.svg"}`}
            width={18}
            height={18}
            alt="Downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" && (
        <Image
          src={`/assets/icons/${hasSaved ? "star-filled.svg" : "star-red.svg"}`}
          width={18}
          height={18}
          alt="Star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
