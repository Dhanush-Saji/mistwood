"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { UAParser } from 'ua-parser-js';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ARButton = () => {
    const router = useRouter()
    var parser = new UAParser();
    let os = (parser.getResult())?.os?.name
    const submitFn = () =>{
        toast.error('This feature is only available on mobile!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
          });
    }
  return (
    <>
    <ToastContainer />
    {
      os == 'Android' ?
      <Link href={'https://false-opalescent-ravioli.glitch.me/'} prefetch={false} className='w-fit rounded-full px-5 py-2 font-semibold text-md bg-[#27282a] text-white'>
        Show me
      </Link>
      :
    <Button onClick={submitFn} className='w-fit rounded-full px-5 mt-5 font-semibold text-md bg-[#27282a]'>Show me</Button>
    }
    </>
  )
}

export default ARButton