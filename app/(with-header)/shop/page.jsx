import Image from "next/image";
import React from "react";
import ProductBanner from '@/public/images/product-page-banner.png'
import CategoryListCount from "@/components/CategoryListCount";
import ProductPageSection from "@/components/ProductPageSection/ProductPageSection";


const Page = () => {
  let customParams = ''
  return (
    <div className="flex-col items-center bg-white dark:bg-neutral-800 w-screen min-h-screen relative pb-6 px-4 sm:px-[2rem] pt-[12vh] sm:pt-[12vh]">
    <div>
      <Image width={'150px'} height={400} className='w-full rounded-[8px]' src={ProductBanner} alt="product-banner" />
    </div>
    <CategoryListCount customParams={customParams} />
    <ProductPageSection customParams={customParams} />
  </div>
  );
};

export default Page;
