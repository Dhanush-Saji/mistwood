import LoaderLogo from '@/components/Loaders/LoaderLogo'
import React from 'react'
  

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <LoaderLogo />
    </div>
  )
}

export default Loading