'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import { useUserStore } from '@/lib/zustandStore'

const SignoutBtn1 = () => {
  const resetStore = useUserStore(state => state.resetStore)
  return (
    <Button nClick={()=>{
      signOut()
      resetStore()
    }} className='w-full'>Log Out</Button>
  )
}

export default SignoutBtn1