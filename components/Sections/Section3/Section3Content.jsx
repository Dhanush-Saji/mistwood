import ARButton from '@/components/ARButton'
import AnimatingText from '@/components/AnimatingText'
import Image from 'next/image'
import React from 'react'
import MobGif from '../../../public/video/mobile.gif'

const Section3Content = () => {
  return (
    <>
    <div className='order-2 md:order-1 pb-5 md:pb-0 relative z-20 pt-14'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center'>
      <span className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 text-[#27282a] dark:text-[#eeeeee]'>See it.</span>
      <AnimatingText />
      </div>
      <p className='w-full sm:w-[60vw] font-medium text-[#27282a] dark:text-[#919191]'>Ditch the measuring tape, embrace AR furniture previews.</p>
      <p className=' text-red-500 text-xs mt-2 font-semibold'>*This feature is only available on mobile*</p>
      <div className='mt-5 sm:mt-0'>
      <ARButton />
      </div>
      </div>
        <Image alt='mobile-gif' id='mobile-gif' src={MobGif} className='absolute top-[50%] left-[50%] md:left-[70%] transform -translate-x-1/2 -translate-y-1/2 mt-[30vh] md:mt-0'></Image>
    </>
  )
}

export default Section3Content