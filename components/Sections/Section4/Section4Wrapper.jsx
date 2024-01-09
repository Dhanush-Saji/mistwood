'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

const Section4Wrapper = ({children}) => {
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
    <div ref={sectionRef} className='forth-section flex w-screen py-10 px-7 sm:px-10 flex-col justify-center bg-white dark:bg-[#313131]'>
        {children}
    </div>
  )
}

export default Section4Wrapper