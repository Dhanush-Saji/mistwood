import React from 'react'
import Image from 'next/image';
import Bulb from '../public/images/bulb.png'

const SofaModelLights = ({switchLight,setswitchLight}) => {
  return (
    <>
    <div onClick={()=>setswitchLight({...switchLight,first:!switchLight.first})} className={`absolute top-5 left-[40px] h-[50px] rotate-[-45deg] cursor-pointer ${switchLight.first?'':'grayscale'}`}>
      <Image alt='bulb-image' height={70} src={Bulb} className='' />
      </div>
      <div onClick={()=>setswitchLight({...switchLight,second:!switchLight.second})} className={`absolute top-5 right-[40px] h-[50px] rotate-[45deg] cursor-pointer ${switchLight.second?'':'grayscale'}`}>
      <Image alt='bulb-image' height={70} src={Bulb} className='' />
      </div>
    </>
  )
}

export default SofaModelLights