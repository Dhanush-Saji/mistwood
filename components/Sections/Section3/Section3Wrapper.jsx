"use client"
import React, { useLayoutEffect } from 'react'
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const Section3Wrapper = ({children}) => {
    useLayoutEffect(()=>{
        new ScrollTrigger({})
      let thirdElem = ScrollTrigger.create({
        trigger: '.third-section',
        start: "top top",
        scrub: 3,
        pin:true,
        pinSpacing:false,
      });
      return()=>{
        if(thirdElem) thirdElem.kill()
      }
      },[])
  return (
    <div className=' third-section flex flex-col md:flex-row w-screen h-screen px-7 items-center sm:px-10 text-[#27282a overflow-hidden relative bg-[#FFFBEA]'>
 {children}
    </div>
  )
}

export default Section3Wrapper