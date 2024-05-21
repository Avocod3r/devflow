import React from "react";
import Image from "next/image";
import Link from "next/link";

const topQuestions = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 2,
    title: "How can an airconditioning machine exist?",
  },
  {
    _id: 3,
    title: "Interrogated every time crossing UK Border as citizen",
  },
  {
    _id: 4,
    title: "Low digit addition generator",
  },
  {
    _id: 5,
    title:
      "What is an example of 3 numbers that do not make up a vector?",
  },
];

const TopQuestions = () => {
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Top questions</h3>
      <div className="mt-6 flex w-full flex-col gap-[30px]">
        {topQuestions.map(({ _id, title }) => (
          <Link
            href={`/questions/${_id}`}
            className="flex items-center justify-between gap-7"
            key={_id}
          >
            <p className="text-dark500_light700 body-medium">
              {title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              height={20}
              width={20}
              alt="details..."
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopQuestions;
