import React from 'react'
import { Button } from './ui/button'

const Section1 = () => {
  return (
    <div className='home-section flex w-screen h-screen px-7 sm:px-10 flex-col pt-[10vh] justify-start text-[#27282a]'>
      <div className="home-section-div">

      <div className='home-section-hero flex flex-col'>
      <span className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0'>Furniture</span>
      <div className='flex flex-col sm:flex-row'>
      <span className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 mt-[-35px] sm:mt-[-53px] mr-5'>you will</span>
      <span className='text-[4rem] sm:text-[5rem] md:text-[6rem] font-[800] m-0 mt-[-20px] sm:mt-[-53px]'>love</span>

      </div>
      </div>
      <p className='w-full sm:w-[60vw] font-medium'>Indulge in sensory bliss with furniture crafted with passion, where premium materials and meticulous detail whisper "forever love."</p>
      <Button className='w-fit rounded-full px-5 mt-5 font-semibold text-md bg-[#ffde3c] hover:bg-[#ffe45b] text-[#27282a]'>Explore</Button>
      </div>
    </div>
  )
}

export default Section1