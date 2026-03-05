"use client"
import React, { useEffect, useLayoutEffect } from 'react'
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/lib/zustandStore';
import { getCart } from '@/utils/APICalls';
import { DotPattern } from '@/components/ui/dot-pattern';
// gsap.registerPlugin(ScrollTrigger)

const Section2Wrapper = ({ children }) => {
  const { data: session, status } = useSession()
  const { addToCart } = useUserStore()
  const getCartFn = async () => {
    try {
      let payload = {
        userId: session?.userData?._id,
      }
      const res = await getCart(payload)
      if (res?.status) {
        addToCart(res?.data?.cart || [])
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (status == 'authenticated') {
      getCartFn()
    }
  },[session])
  return (
    <div className=' second-section relative flex w-screen h-screen px-7 sm:px-10 flex-col pt-[10vh] justify-center items-end text-[#252525] bg-white dark:bg-neutral-700'>
     <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      {children}
    </div>
  )
}

export default Section2Wrapper