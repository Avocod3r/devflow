import React from "react";
import Link from "next/link";
import Tag from "@/components/ui/tag";

const popularTags = [
  { _id: 1, name: "Javascript", count: "20152" },
  { _id: 2, name: "React", count: "18493" },
  { _id: 3, name: "Next", count: "16269" },
  { _id: 4, name: "Node", count: "15121" },
  { _id: 5, name: "Test", count: "9700" },
  { _id: 6, name: "Redux", count: "6589" },
];

const PopularTags = () => {
  return (
    <div className="mt-16 flex flex-col gap-3">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      {popularTags.map(({ _id, name, count }) => (
        <Link
          href={`/tags/${_id}`}
          className="flex items-center justify-between gap-2"
          key={_id}
        >
          <Tag>{name}</Tag>
          <p className="small-medium text-dark500_light700">
            {count}+
          </p>
        </Link>
      ))}
    </div>
  );
};

export default PopularTags;
