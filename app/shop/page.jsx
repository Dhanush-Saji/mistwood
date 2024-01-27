"use client";
import ProductSingle from "@/components/ProductSingle";
import { getProduct,getCategoryCount } from "@/utils/APICalls";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductBanner from '@/public/images/product-page-banner.png'
import ChairImage from '@/public/images/chair.svg'
import BedImage from '@/public/images/bed.svg'
import TableImage from '@/public/images/table.svg'
import SofaImage from '@/public/images/sofa.svg'
import AllImage from '@/public/images/allfurniture.svg'
import Link from "next/link";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import { useSearchParams } from "next/navigation";
import CategoryListCount from "@/components/CategoryListCount";
const NoData = dynamic(() => import("@/components/Loaders/NoData"), {
  ssr: false,
});

const Page = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const ImageArray = [AllImage,ChairImage,BedImage,TableImage,SofaImage]
  const [productData, setproductData] = useState([]);
  const [categoryTab, setcategoryTab] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const getPro = async () => {
    setproductData([])
    setisLoading(true)
    try {
      const res = await getProduct(search);
      setproductData(res);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false)
  };
  const getProCount = async () => {
    try {
      const res = await getCategoryCount();
      setcategoryTab(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProCount()
  }, []);
  useEffect(() => {
    getPro();
  }, [search]);
  return (
    <div className="flex-col items-center bg-white dark:bg-[#313131] w-screen min-h-screen relative p-2 px-4 sm:px-0 sm:p-7 md:p-16">
    <div>
      <Image className='w-full rounded-[8px]' src={ProductBanner} alt="product-banner" />
    </div>
    {categoryTab.length>0?<CategoryListCount search={search} categoryTab={categoryTab} />
    :<div className='w-full flex justify-center  mt-[2rem]'>
    <LoadingCircle />
    </div>}
    {isLoading?<div className='w-full flex justify-center  mt-[2rem]'>
    <LoadingCircle />
    </div>:productData?.length == 0? <NoData />:null}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-full mt-5">
    {productData?.length>0 && productData?.map((product, index) => (
      <React.Fragment key={index}>
      <ProductSingle product={product} />
      </React.Fragment>
    ))}
    </div>
  </div>
  );
};

export default Page;
