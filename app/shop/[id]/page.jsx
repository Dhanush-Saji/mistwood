"use client";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import { Button } from "@/components/ui/button";
import { changeNumberFormat } from "@/services/Formatter";
import { getSingleProduct } from "@/utils/APICalls";
import Image from "next/image";
import React, { useState,useEffect } from "react";
const Page = ({ params }) => {
  const [qnty, setqnty] = useState(0)
  const [product, setproduct] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const getSinglepro = async () => {
    try {
      const res = await getSingleProduct(params.id) || [];
      setproduct(res)
      setimageIndex(res[0]?.product_image?.img1?.url)
    } catch (error) {
      console.error(error);
    }
    setisLoading(false)
  };
  useEffect(()=>{
    setisLoading(true)
    getSinglepro()
  },[])
  const [imageIndex, setimageIndex] = useState('')
  return isLoading?<div className="w-[100vw] h-[100vh] flex items-center justify-center"><LoadingCircle /></div>:
  (
    <div className="w-full flex flex-col p-3 pt-[16vh]">
      <div className="w-full flex">
        <div className="flex justify-center flex-col gap-2">
          <Image
            width={500}
            height={500}
            alt="image"
            src={imageIndex}
          />
          <div className="flex gap-2 justify-center">
            <div onClick={()=>setimageIndex(product[0]?.product_image?.img1?.url)} className={`rounded-md cursor-pointer flex p-1 ${imageIndex == product[0]?.product_image?.img1?.url?'border-2 border-[#27282a]':'border'}`}>
              <Image
            width={100}
            height={100} className="w-[3rem] h-[3rem] object-cover rounded-md m-auto"
            alt="image"
            src={product[0]?.product_image?.img1?.url}
          /></div>
            <div onClick={()=>setimageIndex(product[0]?.product_image?.img2?.url)} className={`rounded-md cursor-pointer flex p-1 ${imageIndex == product[0]?.product_image?.img2?.url?'border-2 border-[#27282a]':'border'}`}>
              <Image
            width={100}
            height={100} className="w-[3rem] h-[3rem] object-cover rounded-md m-auto"
            alt="image"
            src={product[0]?.product_image?.img2?.url}
          /></div>
            <div onClick={()=>setimageIndex(product[0]?.product_image?.img3?.url)} className={`rounded-md cursor-pointer flex p-1 ${imageIndex == product[0]?.product_image?.img3?.url?'border-2 border-[#27282a]':'border'}`}>
              <Image
            width={100}
            height={100} className="w-[3rem] h-[3rem] object-cover rounded-md m-auto"
            alt="image"
            src={product[0]?.product_image?.img3?.url}
          /></div>
          </div>
        </div>
        <div className="pl-3">
          <h1 className="text-md font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {product[0]?.product_name}
          </h1>
          <h1 className="text-md">{product[0]?.description}</h1>
          <h1 className="text-md opacity-60">
            {product[0]?.category?.category_name}
          </h1>
          <div className="flex gap-2 items-center mt-auto">
            <h1 className="text-md font-bold m-0">
              ₹{changeNumberFormat(product[0]?.sellingprice)}
            </h1>
            <h1 className="text-xs line-through opacity-60 m-0">
              ₹{changeNumberFormat(product[0]?.price)}
            </h1>
          </div>
          <div className="mt-[1rem] flex items-center">
            <Button disabled={qnty == 1} variant="outline" onClick={()=>setqnty((prev)=>prev-1)}>-</Button>
            <div className="min-w-[2rem] flex items-center justify-center">
            <span className=" font-[700]">{qnty}</span>
            </div>
            <Button variant="outline" onClick={()=>setqnty((prev)=>prev+1)}>+</Button>
          </div>
          <Button className="mt-[1rem]">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
