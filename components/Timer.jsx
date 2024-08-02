'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Timer = ({link='/'}) => {
    const router = useRouter()
    const [time, setTime] = useState(9)
    useEffect(() => {
        if (time > 0) {
          const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
          }, 1000);
          
          // Clean up the interval on component unmount
          return () => clearInterval(timer);
        }
        if(time == 0){
          router.push(link)
        }
      }, [time]);
  return (
    <span>00:0{time}</span>
  )
}

export default Timer