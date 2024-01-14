import { Button } from '@/components/ui/button'
import React from 'react'

const Section1 = () => {
  return (
    <div className=' home-section flex w-screen h-screen px-7 sm:px-10 flex-col pt-[10vh] justify-start text-[#27282a]'>
      <div className="home-section-div">
      <div className='home-section-hero flex flex-col'>
      <span data-scroll data-scroll-speed='0.3' className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0'>Furniture</span>
      <div className='flex flex-col sm:flex-row'>
      <span data-scroll data-scroll-speed='0.3' className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 mt-[-35px] sm:mt-[-53px] mr-5'>you will</span>
      <span data-scroll data-scroll-speed='0.3' className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 mt-[-20px] sm:mt-[-53px]'>love</span>

      </div>
      </div>
      <p data-scroll data-scroll-speed='0.3' className='w-full sm:w-[60vw] font-medium'>Indulge in sensory bliss with furniture crafted with passion, where premium materials and meticulous detail whisper "forever love."</p>
      <Button data-scroll data-scroll-speed='0.3' className='w-fit rounded-full px-5 mt-5 font-semibold text-md bg-[#ffde3c] hover:bg-[#ffe45b] text-[#27282a]'>Explore</Button>
      </div>
    </div>
  )
}

export default Section1