import Image from "next/image";
import Link from "next/link";
import { getHotQuestions } from "@/lib/actions/question.action";

const TopQuestions = async () => {
  const { hotQuestions } = await getHotQuestions();
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Top questions</h3>
      <div className="mt-6 flex w-full flex-col gap-[30px]">
        {hotQuestions.map(({ _id, title }) => (
          <Link
            href={`/question/${_id}`}
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
