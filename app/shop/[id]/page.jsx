"use client";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import SliderComponent from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { changeNumberFormat } from "@/services/Formatter";
import { getSingleProduct } from "@/utils/APICalls";
import Image from "next/image";
import React, { useState,useEffect } from "react";

const Page = ({ params }) => {
  const [qnty, setqnty] = useState(0)
  const [product, setproduct] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [imageArray, setimageArray] = useState([])
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
  useEffect(()=>{
    setisLoading(true)
    getSinglepro()
  },[])
  return isLoading?<div className="w-[100vw] h-[100vh] flex items-center justify-center"><LoadingCircle /></div>:
  (
    <div className="w-full flex flex-col p-5 sm:p-3 pt-[16vh] sm:pt-[16vh]">
      <div className="w-full flex flex-col sm:flex-row">
        <SliderComponent imageArray={imageArray} />
        <div className="hidden sm:flex justify-center flex-row  sm:flex-col gap-2">
          <Image
            width={500}
            height={500} className="w-[15rem] h-[15rem] sm:h-auto sm:w-auto object-cover m-auto"
            alt="image"
            src={imageArray[imageIndex]}
          />
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {
              imageArray?.map((imageUrl,index)=>(
                <div onClick={()=>setimageIndex(index)} className={`rounded-md cursor-pointer flex p-1 ${imageArray == product[0]?.product_image?.img1?.url?'border-2 border-[#27282a]':'border'}`}>
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
        <div className="pl-0 sm:pl-3 mt-4 sm:mt-0">
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
          <Button className="mt-[1rem] w-[100%] sm:w-auto">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
