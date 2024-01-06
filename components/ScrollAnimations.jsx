"use client"
import React, { useLayoutEffect } from 'react'
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { UAParser } from 'ua-parser-js';
gsap.registerPlugin(ScrollTrigger)

const ScrollAnimations = () => {
    var parser = new UAParser();
    let os = (parser.getResult())?.os?.name
    const tl = gsap.timeline()
    useLayoutEffect(()=>{
        new ScrollTrigger({})
        tl
    .set('#mobile-gif', { x: '500'})
    .to('.home-section-div',{opacity:0,xPercent:'-150',
      scrollTrigger:{
        trigger:'.second-section',
        start:"top bottom",
        end:"top top",
        scrub:0.5,
        immediateRender:false
      }
    })
    .to('#mobile-gif', {
        x:os == 'Android'?'0':'-20',
        scrollTrigger: {
          trigger: '.third-section',
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
          immediateRender: false,
          
        }
      })
      },[])

  return (
    <>
    </>
  )
}

export default ScrollAnimations