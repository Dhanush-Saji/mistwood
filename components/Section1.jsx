import React from 'react'
import { Button } from './ui/button'

const Section1 = () => {
  return (
    <div className='home-section flex w-screen h-screen px-10 flex-col pt-[3rem] justify-start text-[#27282a]'>
      <div className='flex flex-col'>
      <span className='text-[6rem] font-[800] m-0'>Furniture</span>
      <span className='text-[6rem] font-[800] m-0 mt-[-53px]'>you will love</span>
      </div>
      <p className='w-[40vw] font-medium'>Indulge in sensory bliss with furniture crafted with passion, where premium materials and meticulous detail whisper "forever love."</p>
      <Button className='w-fit rounded-full px-5 mt-5 font-semibold text-md bg-[#ffde3c] hover:bg-[#ffe45b] text-[#27282a]'>Explore</Button>
    </div>
  )
}

export default Section1