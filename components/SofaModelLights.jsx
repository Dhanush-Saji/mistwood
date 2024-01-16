import React from 'react'
import Image from 'next/image';
import Bulb from '../public/images/bulb.png'
import Arrow from '../public/images/arrow.svg'

const SofaModelLights = ({switchLight,setswitchLight}) => {
  return (
    <>
    <div onClick={()=>setswitchLight({...switchLight,first:!switchLight.first})} className={`absolute top-14 left-[60px] flex cursor-pointer ${switchLight.first?'':'grayscale'}`}>
      <div>
      <Image alt='bulb-image' height={70} src={Bulb} className='rotate-[-45deg]' />
      </div>
      <div className='flex flex-col pt-5'>
      <Image alt='arrow-image' height={50} src={Arrow} className='rotate-[-100deg]' />
      <h1 className='comic-text'>Switch on</h1>
      </div>
      </div>
      <div onClick={()=>setswitchLight({...switchLight,second:!switchLight.second})} className={`absolute top-14 right-[60px] h-[50px] rotate-[45deg] cursor-pointer ${switchLight.second?'':'grayscale'}`}>
      <Image alt='bulb-image' height={70} src={Bulb} className='' />
      </div>
    </>
  )
}

export default SofaModelLights