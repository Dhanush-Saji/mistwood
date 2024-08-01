'use client'
import React, { useEffect, useState } from 'react'
import './cart.css'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/lib/zustandStore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { changeNumberFormat } from '@/services/Formatter'
import { Button } from '@/components/ui/button'
import { deleteCartAPI, getCart, updateCartAPI } from '@/utils/APICalls'
import { toast } from 'react-toastify'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import CheckoutBtn from '@/components/Button/CheckoutBtn'
import { IoMdCloseCircle } from "react-icons/io";
import NoData from '@/components/Loaders/NoData'

const Page = () => {
  const [cartVal, setcartVal] = useState({subTotal:0,shipping:0,discounts:0,cartTotal:0})
  const [isLoading, setisLoading] = useState(false)
  const { addToCart, removeFromCart } = useUserStore();
  const data = useSession()
  console.log(data);
  const cartArray = useUserStore(state => state.cart) || []
  const cartUpdateFn = async (type, id) => {
    setisLoading(true)
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
      setisLoading(false)
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
      setisLoading(true)
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
      setisLoading(false)
    }
  };
  useEffect(() => {
    if (data?.status == 'authenticated') {
      getCartFn()
    }
  }, [data])
  useEffect(()=>{
    if(cartArray?.length>0){
      let tempObj = {subTotal:0,shipping:0,discounts:0,cartTotal:0}
      cartArray?.map((item,index)=>{
        tempObj.subTotal += (item?.productId?.sellingprice * item?.quantity)
        tempObj.discounts += ((item?.productId?.sellingprice - (item?.productId?.sellingprice * (item?.productId?.discounts?(100 - item?.productId?.discounts?.percentage):100)/100))*item?.quantity)
      })
      setcartVal({...tempObj,cartTotal:tempObj?.subTotal-tempObj?.discounts})
    }
  },[cartArray])
  return (
    <div className="bg-[rgba(245,247,248,1)] dark:bg-neutral-800 min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[5rem] sm:pt-[6rem]">
      <div className={`grid grid-cols-1 md:grid-cols-[70%_30%] gap-2`}>
        <div className='flex flex-col'>
          <h1 className='text-left text-[22px] font-extrabold'>Shopping Bag</h1>
          <h1 className='text-left text-[13px] font-normal'>
            <span className='font-bold mr-2'>{cartArray?.length} items</span>in your bag
          </h1>
          {cartArray?.length > 0 ? <div className='flex flex-col gap-2 bg-white rounded-lg mt-4 dark:bg-zinc-700'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Product</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  cartArray?.length > 0 && cartArray?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className='flex gap-4'>
                          <Image priority={true}
                            width={100}
                            height={100} className="w-[10rem] max-h-[15rem] object-contain"
                            alt="image" src={item?.productId?.product_image?.img1?.url} />
                          <div className='flex flex-col'>
                            <p className="font-semibold">
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
                          <Button className='rounded-full w-0 h-4' onClick={() => cartUpdateFn(0, item?._id)} disabled={isLoading || item?.quantity == 1}  >
                            -
                          </Button>
                         
                          <Button className='rounded-full w-0 h-4' disabled={isLoading} onClick={() => cartUpdateFn(1, item?._id)} >
                            +
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
        {cartArray?.length > 0 && <div>
          <div className='flex flex-col rounded-lg bg-white px-4 py-2 gap-4 dark:bg-zinc-700'>
            <div className='flex flex-col'>
              <h1 className='text-left text-lg font-extrabold'>Coupon Code</h1>
              <p className='text-left text-sm opacity-50'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <Input type="text" placeholder="coupon code" className='mt-2 rounded-full' />
              <Button className='w-full mt-2 rounded-full py-0'>Apply</Button>
            </div>
            <div className='flex flex-col bg-[#FED28C] py-3 px-4 rounded-lg mb-2 dark:text-zinc-700'>
              <h1 className='text-left text-[1.1rem] font-extrabold'>Cart Total</h1>
              <div className='flex flex-col my-3'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>₹{changeNumberFormat(cartVal?.subTotal)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping charges</span>
                  <span>₹{changeNumberFormat(cartVal?.shipping)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Discount</span>
                  <span>₹{changeNumberFormat(cartVal?.discounts)}</span>
                </div>
                <div className='flex justify-between font-extrabold'>
                  <span>Cart Total</span>
                  <span className='text-[1.2rem]'>₹{changeNumberFormat(cartVal?.cartTotal)}</span>
                </div>
              </div>
              <CheckoutBtn productList={cartArray?.map(item => ({id:item?.productId?._id,quantity:item?.quantity})).filter(id => id)} />
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Page