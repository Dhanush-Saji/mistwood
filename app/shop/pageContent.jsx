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

const PageContent = ({children}) => {
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
  // const getProCount = async () => {
  //   try {
  //     const res = await getCategoryCount();
  //     setcategoryTab(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getProCount()
  // }, []);
  useEffect(() => {
    getPro();
  }, [search]);
  return (
    <div className="flex-col items-center bg-white dark:bg-[#313131] w-screen min-h-screen relative p-2 px-4 sm:px-0 sm:p-7 md:p-16">
      <div>
        <Image className='w-full rounded-[8px]' src={ProductBanner} alt="product-banner" />
      </div>
      {children}
      {/* {categoryTab.length == 0?<div className='w-full flex justify-center  mt-[2rem]'>
      <LoadingCircle />
      </div>
      :(<>
      <div className="hidden md:grid grid-cols-5 gap-[1.5rem] w-full justify-center mt-[0.7rem]">
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
      </div>
      <div className="grid grid-cols-5 md:hidden gap-[0.5rem] w-full justify-center mt-[0.7rem]">
      {
          categoryTab?.length>0 && categoryTab?.map((category,index)=>(
            <Link scroll={false} href={`/shop?category=${category.name}`} className={`${((search == category.name) || (category.name == 'All' && search == null))?'bg-[#ffde3c] border-[#e6ca43]':'border-[rgba(0,0,0,0.2)] hover:border-slate-400'} border  flex rounded-full px-[0.5rem] py-[0.2rem]  md:p-2 gap-3 ease-in transition-all duration-200 hover:scale-105  hover:shadow-md justify-center items-center`} key={index}>
              <p className="font-medium">{category?.name}</p>
              </Link>
          ))
        }
      </div>
      </>)} */}
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
  )
}

export default PageContent