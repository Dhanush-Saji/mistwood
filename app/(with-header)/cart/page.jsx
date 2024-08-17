'use client'
import React, { useEffect, useState } from 'react'
import './cart.css'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/lib/zustandStore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { changeNumberFormat } from '@/services/Formatter'
import { Button } from '@/components/ui/button'
import { deleteCartAPI, getCart, getCoupon, updateCartAPI } from '@/utils/APICalls'
import { toast } from 'react-toastify'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import CheckoutBtn from '@/components/Button/CheckoutBtn'
import { IoMdCloseCircle } from "react-icons/io";
import NoData from '@/components/Loaders/NoData'
import { AiTwotoneTag } from 'react-icons/ai'
import CouponListModal from '@/components/Modal/CouponListModal'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  const [couponCodeAPI, setcouponCodeAPI] = useState({ val: 0, id: '', title: '' })
  const [cartVal, setcartVal] = useState({ subTotal: 0, shipping: 0, discounts: 0, cartTotal: 0 })
  const [isLoading, setisLoading] = useState(false)
  const [loadingStates, setloadingStates] = useState({min:false, add:false})
  const [couponIsLoading, setcouponIsLoading] = useState(false)
  const [cartQnty, setcartQnty] = useState(0)
  const { addToCart, removeFromCart } = useUserStore();
  const data = useSession()
  const cartArray = useUserStore(state => state.cart) || []
  const cartUpdateFn = async (type, id) => {
    if(type == 0){
      setloadingStates({...loadingStates,min:true})
    }else{
      setloadingStates({...loadingStates,add:true})
    }
    try {
      let payload = {
        id,
        type,
        userId: data?.data?.userData?._id,
      }
      const res = await updateCartAPI(payload)
      if (res?.status) {
        toast.success('Cart updated')
        addToCart(res?.data?.cart || [])
      }
    } catch (error) {
      console.error(error);
    } finally {
      if(type == 0){
        setloadingStates({...loadingStates,min:false})
      }else{
        setloadingStates({...loadingStates,add:false})
      }
    }
  };
  const getCartFn = async () => {
    setisLoading(true)
    try {
      let payload = {
        userId: data?.data?.userData?._id,
      }
      const res = await getCart(payload)
      if (res?.status) {
        addToCart(res?.data?.cart || [])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false)
    }
  };
  const deleteCartItem = async (id) => {
    try {
      setloadingStates({...loadingStates,min:true})
      let payload = {
        id,
        userId: data?.data?.userData?._id,
      }
      const res = await deleteCartAPI(payload)
      if (res?.status) {
        toast.success('Cart item delete')
        removeFromCart(id)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setloadingStates({...loadingStates,min:false})
    }
  };
  const [couponList, setcouponList] = useState([])
  const getCouponFn = async () => {
    try {
      setcouponIsLoading(true)
      const res = await getCoupon()
      setcouponList(res?.data)
    } catch (error) {
      console.error(error);
    } finally {
      setcouponIsLoading(false)
    }
  };
  useEffect(() => {
    if (data?.status == 'authenticated') {
      getCartFn()
      getCouponFn()
    }
  }, [data])
  useEffect(() => {
    if (cartArray?.length > 0) {
      let tempObj = { subTotal: 0, shipping: 0, discounts: 0, cartTotal: 0 }
      let tempQnty = 0
      cartArray?.map((item, index) => {
        tempObj.subTotal += (item?.productId?.sellingprice * item?.quantity)
        tempQnty += item?.quantity
        tempObj.discounts += ((item?.productId?.sellingprice - (item?.productId?.sellingprice * (item?.productId?.discounts ? (100 - item?.productId?.discounts?.percentage) : 100) / 100)) * item?.quantity)
      })
      setcartQnty(tempQnty)
      setcartVal({ ...tempObj, cartTotal: tempObj?.subTotal - tempObj?.discounts - couponCodeAPI?.val })
    }
  }, [cartArray,couponCodeAPI])
  // useEffect(() => {
  //   if (couponCodeAPI?.id) {
  //     setcartVal({ ...cartVal, cartTotal: cartVal.cartTotal - couponCodeAPI?.val })
  //   }
  // }, [couponCodeAPI])
  return (
    <div className="bg-[rgba(245,247,248,1)] dark:bg-neutral-800 min-w-[100vw] min-h-[100vh] flex flex-col pb-6 px-4 sm:px-[2rem] pt-[12vh] sm:pt-[12vh]">
      <div className={`grid grid-cols-1 ${cartArray?.length > 0 ? 'md:grid-cols-[70%_30%]' : ''} gap-2`}>
        <div className='flex flex-col'>
          <h1 className='text-left text-[22px] font-extrabold'>Shopping Bag</h1>
          <h1 className='text-left text-[13px] font-normal'>
            <span className='font-bold mr-2'>{cartQnty} items</span>in your bag
          </h1>
          <div className='hidden md:block'>
            {cartArray?.length > 0 ? <div className='hidden md:flex flex-col gap-2 bg-white rounded-lg mt-4 dark:bg-zinc-700'>
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead className="">Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    cartArray?.length > 0 && cartArray?.map((item, index) => (
                      <TableRow key={index} className='hover:bg-transparent'>
                        <TableCell>
                          <div className='flex gap-4'>
                            <Image priority={true}
                              width={100}
                              height={100} className="w-[5rem] max-h-[12rem] object-contain rounded-lg"
                              alt="image" src={item?.productId?.product_image?.img1?.url} />
                            <div className='flex flex-col'>
                              <p className="font-semibold mb-1">
                                {item?.productId?.product_name}
                              </p>
                              {
                                item?.productId?.discounts ?
                                  <div className="flex gap-2 items-center">
                                    <h1 className="m-0 font-bold text-[1rem]">
                                      ₹{changeNumberFormat((item?.productId?.sellingprice * (100 - item?.productId?.discounts?.percentage)) / 100)}
                                    </h1>
                                    <h1 className="line-through opacity-60 m-0">
                                      ₹{changeNumberFormat(item?.productId?.sellingprice)}
                                    </h1>
                                  </div> :
                                  <div className="flex gap-2 items-center">
                                    <h1 className="m-0 font-bold text-[1rem]">
                                      ₹{changeNumberFormat(item?.productId?.sellingprice)}
                                    </h1>
                                  </div>
                              }
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className='flex items-center gap-2 justify-center'>
                            <span className=" font-[700] text-lg">{item?.quantity}</span>
                            <div className='flex flex-col gap-1 w-fit'>
                              <Button variant={item?.quantity == 1 ? 'destructive' : 'default'} className='rounded-full w-6 h-6 p-0 flex justify-center items-center' onClick={() => {
                                item?.quantity == 1 ? deleteCartItem(item?._id) : cartUpdateFn(0, item?._id)
                              }} disabled={loadingStates?.min}  >
                                {loadingStates?.min?<Loader2 className=" h-4 w-4 animate-spin" />:'-'}
                              </Button>

                              <Button className='rounded-full w-6 h-6 p-0 flex justify-center items-center' disabled={loadingStates?.add} onClick={() => cartUpdateFn(1, item?._id)} >
                              {loadingStates?.add?<Loader2 className=" h-4 w-4 animate-spin" />:'+'}
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {
                            item?.productId?.discounts ?
                              <h1 className="m-0 font-semibold">
                                ₹{changeNumberFormat(((item?.productId?.sellingprice * (100 - item?.productId?.discounts?.percentage)) / 100) * item?.quantity)}
                              </h1> :
                              <h1 className="m-0 font-semibold">
                                ₹{changeNumberFormat((item?.productId?.sellingprice) * item?.quantity)}
                              </h1>
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>

            </div> : <NoData />}
          </div>
          <div className='block md:hidden'>
            {cartArray?.length > 0 ? <div className='flex md:hidden flex-col gap-2 bg-[rgba(245,247,248,1)] dark:bg-neutral-800 rounded-lg mt-4'>
              {
                cartArray?.length > 0 && cartArray?.map((item, index) => (
                  <React.Fragment  key={index}>
                  <div className='flex p-2 px-3 items-center dark:bg-zinc-700 rounded-lg'>
                    <Image priority={true}
                      width={100}
                      height={100} className="w-[5rem] md:w-[10rem] h-full md:max-h-[15rem] object-cover md:object-contain rounded-lg"
                      alt="image" src={item?.productId?.product_image?.img1?.url} />
                    <div className='flex gap-4 ml-3'>
                      <div className='flex flex-col'>
                        <p className="font-semibold text-[0.8rem] md:text-[1rem]">
                          {item?.productId?.product_name}
                        </p>
                        {
                          item?.productId?.discounts ?
                            <div className="flex gap-2 items-center">
                              <h1 className="m-0 font-bold text-[1rem]">
                                ₹{changeNumberFormat((item?.productId?.sellingprice * (100 - item?.productId?.discounts?.percentage)) / 100)}
                              </h1>
                              <h1 className="line-through opacity-60 m-0">
                                ₹{changeNumberFormat(item?.productId?.sellingprice)}
                              </h1>
                            </div> :
                            <div className="flex gap-2 items-center">
                              <h1 className="m-0 font-bold text-[1rem]">
                                ₹{changeNumberFormat(item?.productId?.sellingprice)}
                              </h1>
                            </div>
                        }
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 w-fit justify-center'>
                      <Button variant={item?.quantity == 1 ? 'destructive' : 'default'} className='rounded-full w-6 h-6 p-0 flex justify-center items-center' onClick={() => {
                        item?.quantity == 1 ? deleteCartItem(item?._id) : cartUpdateFn(0, item?._id)
                      }} disabled={loadingStates?.min}  >
                        {loadingStates?.min?<Loader2 className=" h-4 w-4 animate-spin" />:'-'}
                      </Button>
                      <span className=" font-[700] text-lg text-center">{item?.quantity}</span>
                      <Button className='rounded-full w-6 h-6 p-0 flex justify-center items-center' disabled={loadingStates?.add} onClick={() => cartUpdateFn(1, item?._id)} >
                      {loadingStates?.add?<Loader2 className=" h-4 w-4 animate-spin" />:'+'}
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  </React.Fragment>
                ))
              }
            </div> : <NoData />}
          </div>
        </div>
        {cartArray?.length > 0 && <div>
          <div className='flex flex-col rounded-lg bg-white px-4 py-2 gap-4 dark:bg-zinc-700'>
            <div className='flex flex-col'>
              <h1 className='text-left text-lg font-[600]'>Coupons</h1>
              {couponCodeAPI?.id?<div className='flex justify-between mt-2'>
                <div className='flex gap-2 items-center'>
                  <AiTwotoneTag className='scale-125' />
                  <div className="flex flex-col">
                    <span className='text-left text-sm whitespace-nowrap font-[600] m-0'>1 Coupon applied</span>
                    <span className='text-left text-xs whitespace-nowrap text-green-600 m-0'>you saved ₹{changeNumberFormat(couponCodeAPI?.val)}</span>
                  </div>
                </div>
                <Button onClick={()=>{
                  setcartVal({ ...cartVal, cartTotal: cartVal.cartTotal + couponCodeAPI?.val })
                  setcouponCodeAPI({ val: 0, id: '', title: '' })}
                  } variant="outline" className='w-[3rem] text-red-500 hover:text-red-500 border border-red-500 h-[2rem] bg-transparent hover:bg-transparent'>Clear</Button>
              </div>:
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <AiTwotoneTag className='scale-125' />
                  <p className='text-left text-sm whitespace-nowrap font-[600]'>Apply coupons</p>
                </div>
                <CouponListModal couponCodeAPI={couponCodeAPI} couponList={couponList} isLoading={couponIsLoading} setcouponCodeAPI={setcouponCodeAPI} total={cartVal?.cartTotal} />
              </div>
              }
            </div>
            <div className='flex flex-col bg-[#FED28C] py-3 px-4 rounded-lg mb-2 dark:text-zinc-700'>
              <h1 className='text-left text-[1rem] font-bold'>Cart Total</h1>
              <div className='flex flex-col my-1 gap-2'>
                <div className='flex justify-between text-[0.9rem]'>
                  <span>Subtotal</span>
                  <span>₹{changeNumberFormat(cartVal?.subTotal)}</span>
                </div>
                <div className='flex justify-between text-[0.9rem]'>
                  <span>Shipping charges</span>
                  <span>₹{changeNumberFormat(cartVal?.shipping)}</span>
                </div>
                <div className='flex justify-between text-[0.9rem]'>
                  <span>Discount</span>
                  <span>₹{changeNumberFormat(cartVal?.discounts)}</span>
                </div>
                {couponCodeAPI?.id && <div className='flex justify-between text-[0.9rem]'>
                  <span>Coupon</span>
                  <span>₹{changeNumberFormat(couponCodeAPI?.val)}</span>
                </div>}
                <div className='flex justify-between font-bold'>
                  <span>Cart Total</span>
                  <span className='text-[1rem]'>₹{changeNumberFormat(cartVal?.cartTotal)}</span>
                </div>
              </div>
              <CheckoutBtn couponCode={couponCodeAPI?.id} productList={cartArray?.map(item => ({ id: item?.productId?._id, quantity: item?.quantity })).filter(id => id)} />
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Page