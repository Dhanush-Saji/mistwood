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
const NoData = dynamic(() => import("@/components/Loaders/NoData"), {
  ssr: false,
});

const page = () => {
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
    <div className="flex-col items-center bg-white dark:bg-[#313131] w-screen min-h-screen relative p-16">
      {/* <div className="relative bg-white">
        <h1 className="text-6xl md:text-7xl font-bold text-center text-[#ecedef] m-0">
          Shop
        </h1>
        <p className="text-[#27282a] text-sm md:text-lg font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
          MistWood Furniture
        </p>
      </div> */}
      <div>
        <Image className='w-full rounded-[8px]' src={ProductBanner} alt="product-banner" />
      </div>
      {categoryTab.length == 0?<div className='w-full flex justify-center  mt-[2rem]'>
      <LoadingCircle />
      </div>
      :<div className="grid grid-cols-5 gap-[1.5rem] w-full justify-center mt-[2rem]">
        {
          categoryTab?.length>0 && categoryTab?.map((category,index)=>(
            <Link scroll={false} href={`/shop?category=${category.name}`} className={`${((search == category.name) || (category.name == 'All' && search == null))?'bg-[#ffde3c] border-[#e6ca43]':'border-[rgba(0,0,0,0.2)] hover:border-slate-400'} border  flex rounded-[8px] p-2 gap-3 ease-in transition-all duration-200 hover:scale-105  hover:shadow-md`} key={index}>
              <div className={`${((search == category.name) || (category.name == 'All' && search == null))?'bg-[#cfc532]':'bg-[#ECECED]'} border border-[rgba(0,0,0,0.2)] rounded-[4px] flex items-center justify-center p-2 `}>
                <Image width='50' height='50' className=" object-contain aspect-square w-[2rem]" src={ImageArray[index]} alt="chair-image" />
              </div>
              <div className="flex flex-col">
              <p className="font-medium">{category?.name}</p>
              <p className="opacity-50">({category?.count})</p>
              </div>
              </Link>
          ))
        }
      </div>}
      {isLoading?<div className='w-full flex justify-center  mt-[2rem]'>
      <LoadingCircle />
      </div>:productData?.length == 0? <NoData />:null}
      <div className="grid grid-cols-5 gap-2 w-full mt-5">
      {productData?.length>0 && productData?.map((product, index) => (
        <React.Fragment key={index}>
        <ProductSingle product={product} />
        </React.Fragment>
      ))}
      </div>
    </div>
  );
};

export default page;
