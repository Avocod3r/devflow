import StatsCard from "@/components/card/StatsCard";
import { formatAndDivideNumber } from "@/lib/utils";

type StatsProps = {
  totalQuestions: number;
  totalAnswers: number;
};

const Stats = ({ totalQuestions, totalAnswers }: StatsProps) => {
  return (
    <div className="mt-10">
      <h3 className="h3-semibold text-dark200_light900">Stats</h3>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">
              Questions
            </p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">
              Answers
            </p>
          </div>
        </div>
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={0}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
