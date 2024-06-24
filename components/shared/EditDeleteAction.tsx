"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteAnswer } from "@/lib/actions/answer.action";

type EditDeleteActionProps = {
  type: "question" | "answer";
  itemId: string;
};

const EditDeleteAction = ({
  type,
  itemId,
}: EditDeleteActionProps) => {
  const path = usePathname();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  const handleDelete = async () => {
    if (type === "question") {
      // delete question
      await deleteQuestion({ questionId: JSON.parse(itemId), path });
    } else if (type === "answer") {
      // delete answer
      await deleteAnswer({ answerId: JSON.parse(itemId), path });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
