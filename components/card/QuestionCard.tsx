import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import Tag from "@/components/ui/tag";
import Metric from "@/components/shared/Metric";
import EditDeleteAction from "@/components/shared/EditDeleteAction";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";

type QuestionCardProps = {
  _id: number;
  clerkId?: string | null;
  title: string;
  createdAt: Date;
  tags: { _id: number; name: string }[];
  author: {
    _id: number;
    name: string;
    picture: string;
    clerkId: string;
  };

  views: number;
  answers: Array<Object>;
  upvotes: string[];
};

const QuestionCard = ({
  clerkId,
  _id,
  title,
  createdAt,
  tags = [],
  author,
  views,
  answers,
  upvotes,
}: QuestionCardProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimeStamp(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
      </div>
      <SignedIn>
        {showActionButtons && (
          <EditDeleteAction
            type="question"
            itemId={JSON.stringify(_id)}
          />
        )}
      </SignedIn>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map(({ _id, name }) => (
          <Link
            key={_id}
            className="flex justify-between gap-2"
            href={`/tags/${_id}`}
          >
            <Tag>{name}</Tag>
          </Link>
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author?.picture || "/assets/icons/avatar.svg"}
          alt="User"
          value={author.name}
          title={` • asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
