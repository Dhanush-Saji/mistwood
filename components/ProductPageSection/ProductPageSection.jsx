'use client'
import { getCommonApi } from '@/utils/APICalls';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import LoadingCircle from '../Loaders/LoadingCircle';
const NoData = dynamic(() => import("@/components/Loaders/NoData"), {
  ssr: false,
});

const ProductPageSection = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const [productData, setproductData] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  const getPro = async () => {
    setproductData([])
    setisLoading(true)
    try {
      const res = await getCommonApi(`/api/products?category=${search}`);
      setproductData(res);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false)
  };
  useEffect(() => {
    getPro();
  }, [search]);
  return (
    <Suspense fallback={<LoadingCircle />}>
      <>
        {isLoading ? <div className='w-full flex justify-center  mt-[2rem]'>
          <LoadingCircle />
        </div> : productData?.length == 0 ? <NoData /> : null}
        <div className="product-grid-list mt-5 gap-4">
          {productData?.length > 0 && productData?.map((product, index) => (
            <div key={index}></div>
          ))}
        </div>
      </>
    </Suspense>
  )
}

export default ProductPageSection