'use client'
import { getProduct } from '@/utils/APICalls';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LoadingCircle from '../Loaders/LoadingCircle';
import ProductSingle from '../ProductSingle';
const NoData = dynamic(() => import("@/components/Loaders/NoData"), {
    ssr: false,
  });

const ProductPageSection = ({customParams}) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('category')
    const [productData, setproductData] = useState([]);
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
    useEffect(() => {
        customParams=search
      getPro();
    }, [search]);
  return (
   <>
   {isLoading?<div className='w-full flex justify-center  mt-[2rem]'>
    <LoadingCircle />
    </div>:productData?.length == 0? <NoData />:null}
    <div className="product-grid-list mt-5 gap-4">
    {productData?.length>0 && productData?.map((product, index) => (
      <React.Fragment key={index}>
      <ProductSingle product={product} />
      </React.Fragment>
    ))}
    </div>
   </>
  )
}

export default ProductPageSection