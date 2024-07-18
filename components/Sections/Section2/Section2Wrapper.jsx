"use client"
import React, { useLayoutEffect } from 'react'
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const Section2Wrapper = ({children}) => {
    useLayoutEffect(()=>{
        let secondElem = ScrollTrigger.create({
          trigger: '.second-section',
          start: "top top",
          scrub: 3,
          pin:true,
          pinSpacing:false
        });
        return()=>{
          if(secondElem) secondElem.kill()
        }
        },[])
  return (
    <div className=' second-section relative flex w-screen h-screen px-7 sm:px-10 flex-col pt-[10vh] justify-center items-end text-[#252525] bg-white dark:bg-[#313131]'>
{children}
  </div>
  )
}

export default Section2Wrapper