
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import ARButton from './ARButton'
import Image from 'next/image'
import MobGif from '../public/video/mobile.gif'
import AnimatingText from './AnimatingText'


const Section3 = () => {
  return (
    <div className='third-section flex w-screen h-screen px-7 items-center sm:px-10 text-[#27282a] bg-[#ffde3c1c]'>
      <div>
      <div className='flex flex-col sm:flex-row items-start sm:items-center'>
      <span className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 text-[#27282a] dark:text-[#eeeeee]'>See it.</span>
      <AnimatingText />
      </div>
      <span className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 mt-[-35px] sm:mt-[-53px] text-[#27282a] dark:text-[#eeeeee]'>Place it</span>
      <p className='w-full sm:w-[60vw] font-medium text-[#27282a] dark:text-[#919191]'>Ditch the measuring tape, embrace AR furniture previews.</p>
      <p className=' text-red-500 text-xs mt-2 font-semibold'>*This feature is only available on mobile*</p>
      <div className='mt-5 sm:mt-0'>
      <ARButton />
      </div>
      </div>
      <div>
        <Image alt='mobile-gif' id='mobile-gif' src={MobGif}></Image>
      </div>
      
      </div>
  )
}

export default Section3