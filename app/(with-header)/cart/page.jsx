'use client'
import React, { useState } from 'react'
import './cart.css'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/lib/zustandStore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { changeNumberFormat } from '@/services/Formatter'
import { Button } from '@/components/ui/button'
import { deleteCartAPI, updateCartAPI } from '@/utils/APICalls'
import { toast } from 'react-toastify'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import CheckoutBtn from '@/components/Button/CheckoutBtn'
import { IoMdCloseCircle } from "react-icons/io";

const page = () => {
  const [isLoading, setisLoading] = useState(false)
  const { addToCart, removeFromCart } = useUserStore();
  const data = useSession()
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
      console.log(res?.data)
      if (res?.status) {
        toast.success('Cart updated')
        addToCart(res?.data?.cart || [])
      }
    } catch (error) {
      console.error(error);
    }finally{
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
      console.log(res?.data)
      if (res?.status) {
        toast.success('Cart item delete')
        removeFromCart(id)
      }
    } catch (error) {
      console.error(error);
    }finally{
      setisLoading(false)
    }
  };
  return (
    <div className="bg-[rgba(245,247,248,1)] min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
      <div className='grid grid-cols-custom gap-2'>
        <div className='flex flex-col'>
          <h1 className='text-left text-[22px] font-extrabold'>Shopping Bag</h1>
          <h1 className='text-left text-[13px] font-normal'>
            <span className='font-bold mr-2'>{cartArray?.length} items</span>in your bag
          </h1>
          <div className='flex flex-col gap-2 bg-white rounded-lg mt-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  cartArray?.length > 0 && cartArray?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className='flex gap-4 w-max'>
                          <Image priority={true}
                            width={100}
                            height={100} className="object-cover"
                            alt="image" src={item?.productId?.product_image?.img1?.url} />
                          <div className='flex flex-col'>
                            {/* <div className="bg-[#06D79C] w-fit px-2 py-[1px] rounded-lg">
                              <span className="text-md opacity-80">
                                {product[0]?.category?.category_name}
                              </span>
                            </div> */}
                            <h1 className="font-semibold overflow-hidden text-ellipsis max-w-[170px]">
                              {item?.productId?.product_name}
                            </h1>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          item?.productId?.discountedPrice ?
                            <h1 className="m-0 font-semibold">
                              ₹{changeNumberFormat((item?.productId?.sellingprice * (100 - item?.productId?.discountedPrice)) / 100)}
                            </h1> :
                            <h1 className="m-0 font-semibold">
                              ₹{changeNumberFormat(item?.productId?.sellingprice)}
                            </h1>
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        <div className='flex gap-2 w-fit m-auto'>
                          <Button onClick={() => cartUpdateFn(0, item?._id)} disabled={isLoading || item?.quantity == 1} variant="secondary" >
                          -
                            </Button>
                          <div className="min-w-[2rem] flex items-center justify-center">
                            <span className=" font-[700]">{item?.quantity}</span>
                          </div>
                          <Button disabled={isLoading} onClick={() => cartUpdateFn(1, item?._id)} variant="secondary">
                          +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          item?.productId?.discountedPrice ?
                            <h1 className="m-0 font-semibold">
                              ₹{changeNumberFormat(((item?.productId?.sellingprice * (100 - item?.productId?.discountedPrice)) / 100) * item?.quantity)}
                            </h1> :
                            <h1 className="m-0 font-semibold">
                              ₹{changeNumberFormat((item?.productId?.sellingprice) * item?.quantity)}
                            </h1>
                        }
                      </TableCell>
                      <TableCell className="text-center">
                      <IoMdCloseCircle cursor={'pointer'} fontSize={'1.4rem'} onClick={()=>deleteCartItem(item?._id)} />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>


          </div>
        </div>
        <div>
        <div className='flex flex-col rounded-lg bg-white px-4 py-2 gap-4'>
        <div className='flex flex-col'>
        <h1 className='text-left text-lg font-extrabold'>Coupon Code</h1>
        <p className='text-left text-sm opacity-50'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <Input type="text" placeholder="coupon code" className='mt-2 rounded-full' />
        <Button className='w-full mt-2 rounded-full py-0'>Apply</Button>
        </div>
        <div className='flex flex-col bg-[#FED28C] py-2 px-4 rounded-lg'>
        <h1 className='text-left text-[1.1rem] font-extrabold'>Cart Total</h1>
        <div className='flex flex-col my-3'>
          <div className='flex justify-between'>
            <span>Subtotal</span>
            <span>5</span>
          </div>
          <div className='flex justify-between'>
            <span>Shipping charges</span>
            <span>5</span>
          </div>
          <div className='flex justify-between'>
            <span>Discount</span>
            <span>5</span>
          </div>
          <div className='flex justify-between font-extrabold'>
            <span>Cart Total</span>
            <span className='text-[1.2rem]'>5</span>
          </div>
        </div>
          <CheckoutBtn userId={data?.data?.userData?._id} productList={cartArray?.map(item => item?.productId?._id).filter(id => id)} />
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default page