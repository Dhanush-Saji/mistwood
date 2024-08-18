import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NoData from '@/components/Loaders/NoData'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { changeNumberFormat } from '@/services/Formatter'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const url = process.env.BACKEND_URL

const Page = async () => {
  const sessionData = await getServerSession(authOptions)
  const userId = sessionData?.userData?._id
  const countList = await getData(userId)
  return (
    <div className="bg-[rgba(245,247,248,1)] dark:bg-neutral-800 min-w-[100vw] min-h-[100vh] flex flex-col pb-6 px-4 sm:px-[2rem] pt-[12vh] sm:pt-[12vh]">
      <div className='flex flex-col'>
        <h1 className='text-left text-[22px] font-extrabold'>My Orders</h1>
        <h1 className='text-left text-[13px] font-normal'>
          <span className='font-bold mr-1'>{countList?.length} Bag</span>in your Order history
        </h1>
      </div>
      <div className='hidden md:flex flex-col gap-4 mt-4'>
        {
          countList?.length > 0 ? countList?.map((item, index) => {
            return <div className='w-full bg-white dark:bg-[#515151] rounded-lg p-4 border-[1px] border-slate-300' key={index}>
              <div className='flex gap-4 mb-2'>
                <div className='flex gap-2 rounded-sm p-2 px-3 text-xs' >
                  <h1 className=' font-semibold'>Order:</h1>
                  <p>{item?._id}</p>
                </div>
              </div>
              {
                item?.products?.length > 0 &&
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Products</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      item?.products.length > 0 && item?.products?.map((product, pindex) => {
                        return <TableRow key={pindex}>
                          <TableCell>
                            <Link href={`/shop/${product?._id?._id}`}>
                              <div className='flex gap-3'>
                                <Image width={100} height={100}
                                  className="w-[3rem] rounded-lg object-cover transition ease-in duration-150 hover:scale-110"
                                  src={product?._id?.product_image?.img1?.url}
                                  alt="product"
                                />
                                <p className='min-w-[200px]'>{product?._id?.product_name}</p>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">
                            <p>{product?.quantity}</p>
                          </TableCell>
                          <TableCell className="text-right">
                            <p>₹{changeNumberFormat(product?.checkoutPrice)}</p>
                          </TableCell>
                        </TableRow>
                      })
                    }
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Discount</TableCell>
                      <TableCell className="text-right">-₹{changeNumberFormat(item?.couponDiscount)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right text-[1.1rem] font-semibold">₹{changeNumberFormat(item?.totalAmount)}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              }
            </div>
          }) : <NoData />
        }
      </div>
      <div className='flex md:hidden flex-col gap-4 mt-4'>
        {
          countList?.length > 0 ? countList?.map((item, index) => {
            return <div className='w-full bg-white dark:bg-[#515151] rounded-lg p-4 border-[1px] border-slate-300' key={index}>
              <div className='flex gap-2 text-xs mb-2' >
                {/* <h1 className=' font-semibold'>Order:</h1> */}
                <p>#{item?._id}</p>
              </div>
              {
                item?.products.length > 0 && item?.products?.map((product, pindex) => {
                  return <div key={pindex}>
                    <Separator className="my-4 dark:bg-white/20" />
                    <Link href={`/shop/${product?._id?._id}`}>
                      <div className='flex gap-3'>
                        <Image width={100} height={100}
                          className="w-[3rem] h-[3rem] rounded-lg object-cover transition ease-in duration-150 hover:scale-110"
                          src={product?._id?.product_image?.img1?.url}
                          alt="product"
                        />
                        <div className='flex flex-col gap-1'>
                          <p className='min-w-[200px] text-sm'>{product?._id?.product_name}</p>
                          <div className='flex gap-2 items-center w-full'>
                            <p className=' text-sm'>Qty: {product?.quantity}</p>
                            <p className='font-bold'>₹{changeNumberFormat(product?.checkoutPrice)}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                })
              }
              <Separator className="my-4 dark:bg-white/20" />
              <div className='flex justify-between items-center opacity-50 text-[0.9rem]'>
                <p colSpan={2}>Discounts</p>
                <p className="text-right">-₹{changeNumberFormat(item?.couponDiscount)}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p colSpan={2} className='font-semibold'>Total</p>
                <h2 className="text-right text-[1.1rem] font-semibold">₹{changeNumberFormat(item?.totalAmount)}</h2>
              </div>
            </div>
          }) : <NoData />
        }
      </div>
    </div>
  )
}

export default Page

async function getData(userId) {
  try {
    const res = await fetch(`${url}/api/ordersList`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    },
    );
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error in the UI (e.g., display an error message)
    return null; // Or return an empty array or object
  }
}

