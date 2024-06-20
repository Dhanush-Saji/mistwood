import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'
const url = process.env.BACKEND_URL

const Page = async() => {
  const sessionData = await getServerSession(authOptions)
  const userId = sessionData?.userData?._id
  const countList = await getData(userId)
    return (
        <div className="bg-[rgba(245,247,248,1)] min-w-[100vw] min-h-[100vh] flex flex-col p-5 pb-16 sm:p-3 sm:px-[2rem] pt-[16vh] sm:pt-[14vh]">
           <div className='flex flex-col'>
          <h1 className='text-left text-[22px] font-extrabold'>My Orders</h1>
          <h1 className='text-left text-[13px] font-normal'>
            <span className='font-bold mr-2'>{countList?.length} items</span>in your bag
          </h1> 
        </div>
        </div>
    )
}

export default Page

async function getData(userId) {
  try {
    const res = await fetch(`${url}/api/ordersList`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userId})
    },
      );
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error in the UI (e.g., display an error message)
    return null; // Or return an empty array or object
  }
}

