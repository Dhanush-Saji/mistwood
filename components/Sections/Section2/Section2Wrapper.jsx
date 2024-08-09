"use client"
import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import GridPattern from '@/components/magicui/grid-pattern';
import { cn } from '@/lib/utils';
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
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      {children}
    </div>
  )
}

export default Section2Wrapper