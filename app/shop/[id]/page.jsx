"use client";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import ProductSingle from "@/components/ProductSingle";
import SliderComponent from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { changeNumberFormat } from "@/services/Formatter";
import { getRelatedProduct, getSingleProduct } from "@/utils/APICalls";
import Image from "next/image";
import React, { useState,useEffect } from "react";

const Page = ({ params }) => {
  const [qnty, setqnty] = useState(1)
  const [product, setproduct] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [imageArray, setimageArray] = useState([])
  const [relatedProduct, setrelatedProduct] = useState([])
  const [imageIndex, setimageIndex] = useState(0)
  const getSinglepro = async () => {
    try {
      const res = await getSingleProduct(params.id) || [];
      setproduct(res)
      let temp = []
      if(res[0]?.product_image?.img1){
        temp.push(res[0]?.product_image?.img1?.url)
      }
      if(res[0]?.product_image?.img2){
        temp.push(res[0]?.product_image?.img2?.url)
      }
      if(res[0]?.product_image?.img3){
        temp.push(res[0]?.product_image?.img3?.url)
      }
      setimageArray(temp)
    } catch (error) {
      console.error(error);
    }
    setisLoading(false)
  };
  const getRelatedPro = async () => {
    try {
      const res = await getRelatedProduct(params.id) || []
      setrelatedProduct(res)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    setisLoading(true)
    getSinglepro()
    getRelatedPro()
  },[])
  return isLoading?<div className="w-[100vw] h-[100vh] flex items-center justify-center"><LoadingCircle /></div>:
  (
    <div className="w-full flex flex-col p-5 pb-16 sm:p-3 sm:px-[5rem] pt-[16vh] sm:pt-[16vh]">
      <div className="w-full flex flex-col sm:flex-row">
        <SliderComponent imageArray={imageArray} />
        <div className="hidden sm:flex justify-center flex-row  sm:flex-col gap-2">
          <div className="bg-[rgba(0,0,0,.05)]" >
          <Image
            width={500}
            height={500} className="w-[15rem] h-[15rem] sm:w-auto sm:h-auto object-cover m-auto mix-blend-multiply"
            alt="image"
            src={imageArray[imageIndex]}
          />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {
              imageArray?.map((imageUrl,index)=>(
                <div key={index} onClick={()=>setimageIndex(index)} className={`rounded-md cursor-pointer flex p-1 ${imageIndex == index?'border-2 border-[#27282a]':'border'}`}>
              <Image
            width={100}
            height={100} className="w-[1.9rem] sm:w-[3rem] h-[1.9rem] sm:h-[3rem] object-cover rounded-md m-auto"
            alt="image"
            src={imageUrl}
          /></div>
              ))
            }
          </div>
        </div>
        <div className="pl-0 sm:pl-3 mt-4 sm:mt-0 flex gap-1 flex-col">
          <h1 className="text-[24px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {product[0]?.product_name}
          </h1>
          <div className="flex gap-2 items-center">
            <h1 className="text-[18px] font-bold m-0">
              ₹{changeNumberFormat(product[0]?.sellingprice)}
            </h1>
            <h1 className="text-[15px] line-through opacity-60 m-0">
              ₹{changeNumberFormat(product[0]?.price)}
            </h1>
          </div>
          <h1 className="text-md opacity-60">
            {product[0]?.category?.category_name}
          </h1>
          <h1 className="text-[16px]">{product[0]?.description}</h1>
          <div className="mt-[1rem] flex items-center">
            <Button disabled={qnty == 1} variant="secondary" onClick={()=>setqnty((prev)=>prev-1)}>-</Button>
            <div className="min-w-[2rem] flex items-center justify-center">
            <span className=" font-[700]">{qnty}</span>
            </div>
            <Button variant="secondary" onClick={()=>setqnty((prev)=>prev+1)}>+</Button>
          <Button className="w-[100%] sm:w-auto ml-[1rem]">Add to Cart</Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-left mt-7 text-[18px] font-bold'>Customers Also Viewed</h1>
        <div className="product-grid-list mt-5 gap-[3rem] sm:gap-[1rem]">
    {relatedProduct?.length>0 && relatedProduct?.map((product, index) => (
      <React.Fragment key={index}>
      <ProductSingle product={product} />
      </React.Fragment>
    ))}
    </div>
      </div>
    </div>
  );
};

export default Page;
