import CategoryListCount from "@/components/CategoryListCount";
import PageContent from "./pageContent";

const page = () => {
  let data
  return (
    <PageContent data={data}>
      <CategoryListCount data={data} />
    </PageContent>
  );
};

export default page;
