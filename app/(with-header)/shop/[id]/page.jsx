"use client";
import { addCartProduct } from "@/actions/server-action";
import LoadingCircle from "@/components/Loaders/LoadingCircle";
import ProductSingle from "@/components/ProductSingle";
import SliderComponent from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/zustandStore";
import { changeNumberFormat } from "@/services/Formatter";
import { addProductToCartFn, getRelatedProduct, getSingleProduct } from "@/utils/APICalls";
import { Truck,Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdOutlineShare } from "react-icons/md";

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
  const [loadingStates, setloadingStates] = useState({prev:false,next:false,addCart:false})
  const getSinglepro = async () => {
    try {
      const res = await getSingleProduct(params.id) || [];
      setproduct(res)
      let temp = []
      if (res[0]?.product_image?.img1) {
        temp.push(res[0]?.product_image?.img1?.url)
      }
      if (res[0]?.product_image?.img2) {
        temp.push(res[0]?.product_image?.img2?.url)
      }
      if (res[0]?.product_image?.img3) {
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
  useEffect(() => {
    setisLoading(true)
    getSinglepro()
    getRelatedPro()
  }, [])
  const addProductToCart = async () => {
    if (!data?.data) {
      router.push('/login')
    }
    try {
      let payload = {
        productId: params?.id,
        userId: data?.data?.userData?._id,
        quantity
      }
      setloadingStates({...loadingStates,addCart:true})
      const res = await addProductToCartFn(payload)
      if (res?.status) {
        toast.success('Added to cart')
        addToCart(res?.data?.cart || [])
      }
      setquantity(1)
    } catch (error) {
      console.error(error);
    }finally{
      setloadingStates({...loadingStates,addCart:false})
    }
  };
  const shareFn = async () => {
    let link = `https://mistwood.vercel.app/shop/${params.id}`
    try {
      await navigator.share({
        title: 'Link',
        url: link
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    useUserStore.persist.rehydrate()
  }, [])
  return isLoading ? <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-[rgba(245,247,248,1)] dark:bg-neutral-800"><LoadingCircle /></div> :
    (
      <div className="bg-[rgba(245,247,248,1)] dark:bg-neutral-800 w-full flex flex-col pb-6 px-4 sm:px-[2rem] pt-[12vh] sm:pt-[12vh]">
        <div className="bg-white dark:bg-white/20 rounded-lg p-4 w-full grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-4 gap-y-4 md:gap-y-0">
          {imageArray?.length > 0 &&
            <SliderComponent imageArray={imageArray} />}
          <div className="hidden sm:flex flex-col justify-center gap-2">
            <div className="bg-[rgba(0,0,0,.15)] dark:bg-neutral-300 rounded-md" >
              {imageArray?.length > 0 && <Image
                priority={false}
                placeholder='empty'
                width={500}
                height={500} className="w-[100%] max-h-[35rem] object-cover m-auto mix-blend-multiply rounded-md"
                alt="image"
                src={imageArray[imageIndex]}
              />}
            </div>
            <div className="flex gap-2">
              {
                imageArray?.length > 0 && imageArray?.map((imageUrl, index) => (
                  <div key={index} onClick={() => setimageIndex(index)} className={`rounded-md w-[3rem] h-[3rem] cursor-pointer flex p-1 ${imageIndex == index ? 'border-2 border-[#27282a] dark:border-neutral-400' : 'border dark:border-transparent'}`}>
                    <Image
                      priority={true}
                      width={100}
                      height={100} className="object-contain rounded-md"
                      alt="image"
                      src={imageUrl}
                    /></div>
                ))
              }
            </div>
          </div>
          <div className="flex gap-1 flex-col w-full">
            <div className="flex w-full justify-between">
            <div>
            <div className="bg-[#06D79C] w-fit px-2 py-[1px] rounded-lg">
              <span className="text-md opacity-80">
                {product[0]?.category?.category_name}
              </span>
            </div>
            </div>
            <button onClick={shareFn} className="border-[1px] border-neutral-500 px-2 py-1 rounded-sm flex items-center gap-1 hover:bg-slate-100">
            <MdOutlineShare />
              Share
            </button>
            </div>
            <h1 className="text-[24px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {product[0]?.product_name}
            </h1>

            <div className="flex gap-4">
              <h2>Availability: </h2>
              {
                product[0]?.isActive ?
                  <h2 className="text-green-600">In Stock</h2> :
                  <h2 className="text-red-600">Out of Stock</h2>
              }
            </div>
            <div className="flex flex-col">
              <h1 className="text-md opacity-60 mt-3 line-clamp-4 md:line-clamp-none">{product[0]?.description}</h1>
            </div>
            <div className="flex flex-col">
            {
              product[0]?.discounts?
                <div className="flex gap-2 items-center">
                  <h1 className="text-[22px] m-0 font-semibold">
                    ₹{changeNumberFormat((product[0]?.sellingprice * (100 - product[0]?.discounts?.percentage)) / 100)}
                  </h1>
                  <h1 className="text-[15px] line-through opacity-60 m-0">
                    ₹{changeNumberFormat(product[0]?.sellingprice)}
                  </h1>
                </div> :
                <div className="flex gap-2 items-center">
                  <h1 className="text-[22px] m-0 font-semibold">
                    ₹{changeNumberFormat(product[0]?.sellingprice)}
                  </h1>
                </div>
            }
            <p className='text-sm opacity-50'>Inclusive of all taxes</p>
            </div>
            <div className="mt-[1rem] flex items-center">
              <Button disabled={quantity == 1} variant="secondary" onClick={() => setquantity((prev) => prev - 1)}>-</Button>
              <div className="min-w-[2rem] flex items-center justify-center">
                <span className=" font-[700]">{quantity}</span>
              </div>
              <Button variant="secondary" onClick={() => setquantity((prev) => prev + 1)} disabled={!product[0]?.isActive}>+</Button>
              <Button onClick={() => addProductToCart()} className="w-[100%] sm:w-auto ml-[1rem]" disabled={!product[0]?.isActive || loadingStates?.addCart}>
              {loadingStates?.addCart &&<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add to Cart</Button>
            </div>
            <div className="mt-4">
              <div className="flex gap-4 px-[0.8rem] py-[0.5rem] rounded-[8px] bg-zinc-200 dark:bg-zinc-800">
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
          <div className="product-grid-list mt-5 ">
            {relatedProduct?.length > 0 && relatedProduct?.map((product, index) => (
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
