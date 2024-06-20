import React from 'react'

const Page = () => {
    return (
        <div className="bg-[rgba(245,247,248,1)] min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
           <div className='flex flex-col'>
          <h1 className='text-left text-[22px] font-extrabold'>Carts</h1>
          <h1 className='text-left text-[13px] font-normal'>
            <span className='font-bold mr-2'>0 items</span>in your bag
          </h1> 
        </div>
        </div>
    )
}

export default Page
