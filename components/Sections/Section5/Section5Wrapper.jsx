'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useLayoutEffect, useRef } from 'react'

const Section5Wrapper = ({children}) => {
    gsap.registerPlugin(ScrollTrigger)
    const sectionRef = useRef(null)
    useLayoutEffect(()=>{
      let elem = sectionRef.current
      let trigger = ScrollTrigger.create({
        trigger: elem,
        start: "top top",
        pin:true,
        pinSpacing:false,
        markers:true
      });
      return()=>{
        if(trigger) trigger.kill()
      }
    },[])
  return (
    <div className='fifth-section flex w-screen h-screen flex-col justify-center bg-white relative z-0'>
     {children}
    </div>
  )
}

export default Section5Wrapper