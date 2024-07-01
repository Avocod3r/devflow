import FilterSelect from "@/components/shared/filterselect/FilterSelect";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/Pagination";
import NoResult from "@/components/shared/NoResult";
import TagCard from "@/components/card/TagCard";
import { getAllTags } from "@/lib/actions/tag.action";
import { TagFilters } from "@/constants/filters";
import { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          classNames="flex-1"
        />
        <FilterSelect
          filterName="Filter tag by..."
          filters={TagFilters}
          classNames="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Page;
