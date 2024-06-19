import SuccessLottie from '@/components/Loaders/SuccessLottie'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="bg-[rgba(245,247,248,1)] min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
        <div className='m-auto flex flex-col'>
            <SuccessLottie />
            <div className='flex flex-col gap-2 mt-[-3rem] items-center'>
            <h1 className='text-center font-[700] text-[1.5rem]'>Hurray! Order placed! 🎉</h1>
            <p className='text-center'>Your order has been confirmed and is being processed. Redirecting to the homePage shortly...</p>
            <Link href={'/'}>
            <Button>Home</Button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default page