import React from "react";
import Tag from "../ui/tag";
import Link from "next/link";

type TagCardProps = {
  tag: {
    _id: string;
    name: string;
    questions: string[];
    createdAt: Date;
  };
};

const TagCard = ({ tag }: TagCardProps) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-start justify-center rounded-2xl border px-8 py-10 sm:w-[260px]">
        <Tag className="w-fit rounded-sm px-5 py-1.5 shadow-none">
          <p className="paragraph-semibold text-dark300_light900">
            {tag.name}
          </p>
        </Tag>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {tag.questions.length}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
