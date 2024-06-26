'use client'
import SuccessLottie from '@/components/Loaders/SuccessLottie'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/lib/zustandStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'

const Page = () => {
  const resetStore = useUserStore(state => state.resetStore)
  const router = useRouter()
  const [timer, settimer] = useState(8)
  useEffect(() => {
    const intervalId = setInterval(() => {
      settimer(prev => {
        if (prev <= 0) {
          clearInterval(intervalId);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  useEffect(() => {
    if (timer == 0) {
      router.replace('/orders')
    }
  }, [timer])
  useEffect(()=>{
    resetStore()
  },[])
  return (
    <div className="bg-white min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
      <div className='m-auto flex flex-col'>
        <SuccessLottie />
        <div className='flex flex-col gap-2 mt-[-3rem] items-center'>
          <h1 className='text-center font-[700] text-[1.5rem]'>Hurray! Order placed! 🎉</h1>
          <p className='text-center  opacity-50'>Your order has been confirmed and is being processed. Redirecting to the homePage shortly...{timer}s</p>
          <Link href={'/'}>
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page