"use client";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import ProductSingle from "@/components/ProductSingle";
import SliderComponent from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { changeNumberFormat } from "@/services/Formatter";
import { getRelatedProduct, getSingleProduct } from "@/utils/APICalls";
import { Truck } from "lucide-react";
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
    <div className="bg-[rgba(245,247,248,1)] w-full flex flex-col p-5 pb-16 sm:p-3 sm:px-[5rem] pt-[16vh] sm:pt-[16vh]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-4 gap-y-4 md:gap-y-0">
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
        <div className="p-5 px-10 flex gap-1 flex-col bg-white w-full rounded-lg">
          <h1 className="text-[24px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {product[0]?.product_name}
          </h1>
            {
              product[0]?.discounts?
          <div className="flex gap-2 items-center">
            <h1 className="text-[15px] m-0">
              ₹{changeNumberFormat(product[0]?.sellingprice * (100 - product[0]?.discounts?.percentage)/100)}
            </h1>
            <h1 className="text-[15px] line-through opacity-60 m-0">
              ₹{changeNumberFormat(product[0]?.sellingprice)}
            </h1>
          </div>:
          <div className="flex gap-2 items-center">
            <h1 className="text-[15px] m-0">
              ₹{changeNumberFormat(product[0]?.sellingprice)}
            </h1>
          </div>
            }
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
          <div className="flex gap-4 mt-3">
            <h2>Availability: </h2>
          {
            product[0]?.isActive?
            <h2 className="text-green-600">In Stock</h2>:
            <h2 className="text-red-600">Out of Stock</h2>
          }
          </div>
          <div>
            <div className="flex gap-4 px-[0.8rem] py-[0.5rem] rounded-[8px] border-2 border-gray-300">
            <Truck />
            <div>
              <h2 className="font-[700]">Free Shipping</h2>
              <p className="text-[0.8rem]">Free Shipping World Wide</p>
            </div>
            </div>
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
