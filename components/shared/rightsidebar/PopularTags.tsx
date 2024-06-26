import Link from "next/link";
import Tag from "@/components/ui/tag";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const PopularTags = async () => {
  const { popularTags } = await getTopPopularTags();
  return (
    <div className="mt-16 flex flex-col gap-3">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      {popularTags.map(({ _id, name, numberOfQuestions }) => (
        <Link
          href={`/tags/${_id}`}
          className="flex items-center justify-between gap-2"
          key={_id}
        >
          <Tag>{name}</Tag>
          <p className="small-medium text-dark500_light700">
            {numberOfQuestions}+
          </p>
        </Link>
      ))}
    </div>
  );
};

export default PopularTags;
