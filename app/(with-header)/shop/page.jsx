import Image from "next/image";
import React from "react";
import ProductBanner from '@/public/images/product-page-banner.png'
import CategoryListCount from "@/components/CategoryListCount";
import ProductPageSection from "@/components/ProductPageSection/ProductPageSection";


const Page = () => {
  let customParams = ''
  return (
    <div className="flex-col items-center bg-white dark:bg-[#313131] w-screen min-h-screen relative p-2 px-4 pt-[5rem] sm:pt-[6rem] md:pt-[6rem] sm:p-7 md:p-16">
    <div>
      <Image width={'150px'} height={400} className='w-full rounded-[8px]' src={ProductBanner} alt="product-banner" />
    </div>
    <CategoryListCount customParams={customParams} />
    <ProductPageSection customParams={customParams} />
  </div>
  );
};

export default Page;
