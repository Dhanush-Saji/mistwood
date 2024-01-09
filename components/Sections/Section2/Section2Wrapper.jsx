'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

const Section2Wrapper = ({children}) => {
  gsap.registerPlugin(ScrollTrigger)
  const sectionRef = useRef(null)
  useLayoutEffect(()=>{
    let elem = sectionRef.current
    let trigger = ScrollTrigger.create({
      trigger: elem,
      start: "top top",
      pin:true,
      pinSpacing:false
    });
    return()=>{
      if(trigger) trigger.kill()
    }
  },[])
  return (
    <div ref={sectionRef} className='second-section flex w-screen h-screen px-7 sm:px-10 flex-col pt-[10vh] justify-center items-end text-[#252525] bg-white dark:bg-[#313131]'>
    {children}
  </div>
  )
}

export default Section2Wrapper