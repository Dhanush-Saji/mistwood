import Link from 'next/link'
import React from 'react'
import LoadingCircle from './Loaders/LoadingCircle'
import CategoryCountBtn from './Button/CategoryCountBtn'
import { getCommonApi } from '@/utils/APICalls'

const CategoryListCount = async() => {
  const countList = await getCommonApi('/api/countCategory')
  return (
    <>
    {
      countList?.length>0?
      <>
      <div className="grid grid-cols-5 gap-[0.5rem] w-full justify-center mt-[0.7rem]">
      {
          countList?.length>0 && countList?.map((category,index)=>(
            <div key={index}></div>
          ))
        }
      </div>
      </>:
      <div className='w-full flex justify-center  mt-[2rem]'>
      <LoadingCircle />
      </div>
    }
      </>
  )
}

export default CategoryListCount