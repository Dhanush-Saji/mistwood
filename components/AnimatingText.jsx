"use client"
import React, { useEffect, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition';

const AnimatingText = () => {
    const [index, setIndex] = useState(0);
    const TEXTS = ['Love it.', 'Dream it.','Place it.'];
    useEffect(() => {
        const intervalId = setInterval(
          () => setIndex((index) => index + 1),
          3000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
      }, [])
  return (
    <>
    <span className='char text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 text-[#ffde3c] mt-[-35px] sm:mt-0'>
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </span>
    </>
  )
}

export default AnimatingText