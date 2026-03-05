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
        gsap.to('.home-section-div', {
          opacity: 1, 
          duration: 2,
      });
        tl
    .set('#mobile-gif', { x: '500'})
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
      tl
      .to('#furnitureText', {
          y:'-90px',
          scrollTrigger: {
            trigger: '.home-section',
            start: "top+=40 top+=100",
            end: "center center-=200",
            scrub: 1.5,
            immediateRender: false,
          }
        })
      tl
      .to('#furnitureText1', {
        y:'-70px',
          scrollTrigger: {
            trigger: '.home-section',
            start: "top+=40 top+=100",
            end: "center center-=200",
            scrub: 1.5,
            immediateRender: false,
            
          }
        })
        .to('#indulgeText', {
          y:'-50px',
          scrollTrigger: {
            trigger: '.home-section',
            start: "top+=40 top+=100",
            end: "center center-=200",
            scrub: 1.5,
            immediateRender: false,
          }
          })
          .to('#exploreBtn', {
            y:'-50px',
            scrollTrigger: {
              trigger: '.home-section',
              start: "top+=40 top+=100",
            end: "center center-=200",
              scrub: 1.5,
              immediateRender: false,
            }
            })
      tl
      .to('#elevateHomeText', {
          x:'-20%',
          opacity:1,
          // color: '#ff0000',
          scrollTrigger: {
            trigger: '.second-section',
            start: "top center-=100",
            end: "bottom bottom",
            scrub: 1.5,
            immediateRender: false,
          }
        })
        tl
      .to('#comfortText', {
          x:'-25%',
          opacity:1,
          // color: '#ff0000',
          scrollTrigger: {
            trigger: '.second-section',
            start: "top center-=100",
            end: "bottom bottom",
            scrub: 1.5,
            immediateRender: false,
          }
        })
        tl
        .to('#transformYourSpaceText', {
            x:'-15%',
            opacity:1,
            // color: '#ff0000',
            scrollTrigger: {
              trigger: '.second-section',
              start: "top center-=100",
              end: "bottom bottom",
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