'use client'
import SuccessLottie from '@/components/Loaders/SuccessLottie'
import Timer from '@/components/Timer'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/lib/zustandStore'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Page = () => {
  const { addToCart, removeFromCart } = useUserStore();
  useEffect(()=>{
    addToCart([])
  },[])
  return (
    <div className="bg-white dark:bg-neutral-800 min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
        <div className='m-auto flex flex-col'>
            <SuccessLottie />
            <div className='flex flex-col gap-2 mt-[-3rem] items-center'>
            <h1 className='text-center font-[700] text-[1.5rem]'>Hurray! Order placed! 🎉</h1>
            <p className='text-center  opacity-50'>Your order has been confirmed and is being processed. Redirecting to the homePage shortly...</p>
            <p className='text-center  opacity-50'>
              <Timer link='/' />
            </p>
            <Link href={'/'}>
            <Button>Home</Button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Page