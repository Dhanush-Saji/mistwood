
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import ARButton from './ARButton'


const Section3 = () => {
    
  return (
    <div className='flex w-screen h-screen px-10 flex-col justify-center text-[#27282a]'>
      <div className='flex flex-col'>
      <span className='text-[6rem] font-[800] m-0'>See it. <span className='text-[#ffde3c]'>Love it.</span></span>
      <span className='text-[6rem] font-[800] m-0 mt-[-53px]'>Place it</span>
      </div>
      <p className='w-[40vw] font-medium'>Ditch the measuring tape, embrace AR furniture previews.</p>
      <ARButton />
      </div>
  )
}

export default Section3