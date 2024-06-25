import { auth } from "@clerk/nextjs/server";
import ProfileForm from "@/components/forms/ProfileForm";
import { getUserById } from "@/lib/actions/user.action";

const Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9"></div>
      <ProfileForm
        clerkId={userId}
        user={JSON.stringify(mongoUser)}
      />
    </>
  );
};

export default Page;
