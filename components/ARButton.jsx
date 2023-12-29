"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { UAParser } from 'ua-parser-js';
import { useRouter } from 'next/navigation';

const ARButton = () => {
    const router = useRouter()
    var parser = new UAParser();
    console.log(parser.getResult());
  return (
      <Button isDisabled onClick={()=>router.push('https://false-opalescent-ravioli.glitch.me/')} className='w-fit rounded-full px-5 mt-5 font-semibold text-md bg-[#27282a]'>Explore</Button>
  )
}

export default ARButton