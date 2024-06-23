import Image from "next/image";
import Link from "next/link";

type ProfileLinkProps = {
  imgUrl: string;
  href?: string;
  title: string;
};

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} width={20} height={20} alt="icon" />
      {href ? (
        <Link
          className="paragraph-medium text-accent-blue"
          href={href}
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">
          {title}
        </p>
      )}
    </div>
  );
};

export default ProfileLink;
