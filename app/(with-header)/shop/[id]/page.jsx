"use client";
import { addCartProduct } from "@/actions/server-action";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import ProductSingle from "@/components/ProductSingle";
import SliderComponent from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/zustandStore";
import { changeNumberFormat } from "@/services/Formatter";
import { addProductToCartFn, getRelatedProduct, getSingleProduct } from "@/utils/APICalls";
import { Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const addToCart = useUserStore(state => state.addToCart)
  const router = useRouter();
  const data = useSession()
  const [quantity, setquantity] = useState(1)
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
      const res = await getRelatedProduct(params?.id) || []
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
  const addProductToCart = async () => {
    if(!data?.data){
      router.push('/login')
    }
    try {
      let payload = {
        productId:params?.id,
        userId:data?.data?.userData?._id,
        quantity
      }
      const res = await addProductToCartFn(payload)
      console.log(res);
      if(res?.status){
        toast.success('Added to cart')
        console.log('updated data',res?.data)
        addToCart(res?.data?.cart || [])
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    useUserStore.persist.rehydrate()
  }, [])
  return isLoading?<div className="w-[100vw] h-[100vh] flex items-center justify-center"><LoadingCircle /></div>:
  (
    <div className="bg-[rgba(245,247,248,1)] w-full flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
      <div className="bg-white rounded-lg p-6 py-4 w-full grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-4 gap-y-4 md:gap-y-0">
        {imageArray?.length>0 &&
        <SliderComponent imageArray={imageArray} />}
        <div className="hidden sm:flex flex-col justify-center gap-2">
          <div className="bg-[rgba(0,0,0,.05)] rounded-md" >
          {imageArray?.length>0 &&<Image
          priority={false}
          placeholder = 'empty'
            width={500}
            height={500} className="w-[100%] max-h-[35rem] object-contain m-auto mix-blend-multiply"
            alt="image"
            src={imageArray[imageIndex]}
          />}
          </div>
          <div className="flex gap-2">
            {
              imageArray?.length>0 && imageArray?.map((imageUrl,index)=>(
                <div key={index} onClick={()=>setimageIndex(index)} className={`rounded-md w-[3rem] h-[3rem] cursor-pointer flex p-1 ${imageIndex == index?'border-2 border-[#27282a]':'border'}`}>
              <Image
              priority={true}
            width={100}
            height={100} className="object-cover rounded-md"
            alt="image"
            src={imageUrl}
          /></div>
              ))
            }
          </div>
        </div>
        <div className="flex gap-1 flex-col w-full">
        <div className="bg-[#06D79C] w-fit px-2 py-[1px] rounded-lg">
          <span className="text-md opacity-80">
            {product[0]?.category?.category_name}
          </span>
            </div>
          <h1 className="text-[24px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {product[0]?.product_name}
          </h1>
          
          <div className="flex gap-4">
            <h2>Availability: </h2>
          {
            product[0]?.isActive?
            <h2 className="text-green-600">In Stock</h2>:
            <h2 className="text-red-600">Out of Stock</h2>
          }
          </div>
          <div className="flex flex-col">
          <h1 className="text-md opacity-60 mt-3">{product[0]?.description}</h1>
          </div>
          {
              product[0]?.discountedPrice?
          <div className="flex gap-2 items-center">
            <h1 className="text-[22px] m-0 font-semibold">
              ₹{changeNumberFormat((product[0]?.sellingprice * (100 - product[0]?.discountedPrice))/100)}
            </h1>
            <h1 className="text-[15px] line-through opacity-60 m-0">
              ₹{changeNumberFormat(product[0]?.sellingprice)}
            </h1>
          </div>:
          <div className="flex gap-2 items-center">
            <h1 className="text-[22px] m-0 font-semibold">
              ₹{changeNumberFormat(product[0]?.sellingprice)}
            </h1>
          </div>
            }
          <div className="mt-[1rem] flex items-center">
            <Button disabled={quantity == 1} variant="secondary" onClick={()=>setquantity((prev)=>prev-1)}>-</Button>
            <div className="min-w-[2rem] flex items-center justify-center">
            <span className=" font-[700]">{quantity}</span>
            </div>
            <Button variant="secondary" onClick={()=>setquantity((prev)=>prev+1)} disabled={!product[0]?.isActive}>+</Button>
          <Button onClick={()=>addProductToCart()} className="w-[100%] sm:w-auto ml-[1rem]" disabled={!product[0]?.isActive}>Add to Cart</Button>
          </div>
          <div className="mt-4">
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
