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
  const [qnty, setqnty] = useState(0)
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
    <div className="w-full flex flex-col p-5 sm:p-3 pt-[16vh] sm:pt-[16vh]">
      <div className="w-full flex flex-col sm:flex-row">
        <SliderComponent imageArray={imageArray} />
      </div>
    </div>
  );
};

export default Page;
