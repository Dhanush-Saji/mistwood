import React from 'react'
import Sofa3d from './sofa-3d/Sofa3d'
import Bulb from '../public/images/bulb.png'
import Image from 'next/image'

const Section5 = () => {
  return (
    <div className='fifth-section flex w-screen h-screen flex-col justify-center bg-white relative z-0'>
      <Sofa3d />
    </div>
  )
}

export default Section5