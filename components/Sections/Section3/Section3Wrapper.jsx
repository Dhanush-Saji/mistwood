'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

const Section3Wrapper = ({children}) => {
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
    <div ref={sectionRef} className='third-section flex flex-col md:flex-row w-screen h-screen px-7 items-center sm:px-10 text-[#27282a] bg-[#FFFBEA] overflow-hidden relative'>
        {children}
    </div>
  )
}

export default Section3Wrapper