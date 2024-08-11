import LoaderLogo from '@/components/Loaders/LoaderLogo'
import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import React from 'react'
  

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-white dark:bg-zinc-800'>
       <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      <LoaderLogo />
    </div>
  )
}

export default Loading