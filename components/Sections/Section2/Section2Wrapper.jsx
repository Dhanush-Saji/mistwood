"use client"
import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import GridPattern from '@/components/magicui/grid-pattern';
import { cn } from '@/lib/utils';
import DotPattern from '@/components/magicui/dot-pattern';
gsap.registerPlugin(ScrollTrigger)

const Section2Wrapper = ({ children }) => {
  useLayoutEffect(() => {
    let secondElem = ScrollTrigger.create({
      trigger: '.second-section',
      start: "top top",
      scrub: 3,
      pin: true,
      pinSpacing: false
    });
    return () => {
      if (secondElem) secondElem.kill()
    }
  }, [])
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