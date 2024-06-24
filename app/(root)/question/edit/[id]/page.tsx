import { URLProps } from "@/types";

const Page = ({ params }: URLProps) => {
  return <div>{params.id}</div>;
};

export default Page;
