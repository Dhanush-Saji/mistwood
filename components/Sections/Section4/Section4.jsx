import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import category1 from '../../../public/images/category1.jpg'
import category2 from '../../../public/images/category2.jpg'
import category3 from '../../../public/images/category3.jpg'
import category4 from '../../../public/images/category4.jpg'

const Section4 = () => {
  return (
    <div className='fourth-section flex-col justify-center bg-white dark:bg-[#313131] w-screen min-h-screen py-10 px-5 md:px-32 relative'>
 <div className='relative bg-white'>
        <h1 className='text-6xl md:text-7xl font-bold text-center text-[#ecedef] m-0'>Category</h1>
        <p className='text-[#27282a] text-sm md:text-lg font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0'>MistWood Furniture</p>
        </div>

        <div className='categories relative grid grid-cols-1 md:grid-cols-3 gap-3 mt-10 md:mt-16 bg-white'>
          <Link className='category1 overflow-hidden rounded-lg md:rounded-none md:rounded-tl-[4rem] max-h-[50vh] cursor-pointer relative' href={'/product-page?category=Chair'} prefetch={false}>
            <Image src={category1} alt="" className='transition-all object-cover w-full h-full duration-500' />
            <div class="overlay">
              <button className='text-[#27282a] px-4 cursor-pointer py-2 rounded-full bg-white text-sm font-medium'>Chair category</button>
            </div>
          </Link>
          <div className='flex flex-col gap-3 max-h-[50vh]'>
          <Link className='overflow-hidden rounded-lg md:rounded-none category2 cursor-pointer relative'prefetch={false} href={'/product-page?category=Bed'}>
            <Image src={category2} alt="" className='transition-all object-cover w-full h-full duration-500' />
            <div class="overlay">
              <button className='text-[#27282a] px-4 cursor-pointer py-2 rounded-full bg-white text-sm font-medium'>Bed category</button>
            </div>
            </Link>
            <Link className=' overflow-hidden rounded-lg md:rounded-none category3 cursor-pointer relative' prefetch={false} href={'/product-page?category=Table'}>
            <Image src={category3} alt="" className='transition-all object-cover w-full h-full duration-500' />
            <div class="overlay">
              <button className='text-[#27282a] px-4 cursor-pointer py-2 rounded-full bg-white text-sm font-medium'>Table category</button>
            </div>
            </Link>
          </div>
          <Link className='category4 overflow-hidden rounded-lg md:rounded-none md:rounded-br-[4rem] max-h-[50vh] cursor-pointer relative' prefetch={false} href={'/product-page?category=Sofa'}>
          <Image src={category4} alt="" className='transition-all object-cover w-full h-full duration-500' />
          <div class="overlay">
              <button className='text-[#27282a] px-4 cursor-pointer py-2 rounded-full bg-white text-sm font-medium'>Sofa category</button>
            </div>
          </Link>
        </div>
</div>
  )
}

export default Section4