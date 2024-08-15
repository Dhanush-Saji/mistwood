import Link from 'next/link'
import React from 'react'
import LoadingCircle from './Loaders/LoadingCircle'
import CategoryCountBtn from './Button/CategoryCountBtn'
const url = process.env.BACKEND_URL

const CategoryListCount = async() => {
  const countList = await getData()
  return (
    <>
    {
      countList?.length>0?
      <>
      {/* <div className="hidden md:grid grid-cols-5 gap-[1.5rem] w-full justify-center mt-[0.7rem]">
        {
          countList?.length>0 && countList?.map((category,index)=>(
            <CategoryCountBtn key={index} index={index} category={category} />
          ))
        }
      </div> */}
      <div className="grid grid-cols-5 gap-[0.5rem] w-full justify-center mt-[0.7rem]">
      {
          countList?.length>0 && countList?.map((category,index)=>(
            <CategoryCountBtn key={index} index={index} category={category} />
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

async function getData() {
  const res = await fetch(`${url}/api/countCategory`)
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}