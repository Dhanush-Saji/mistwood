'use client'
import { useUserStore } from '@/lib/zustandStore'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignoutBtn = () => {
  const resetStore = useUserStore(state => state.resetStore)
  return (
    <div onClick={()=>{
      signOut()
      resetStore()
    }} className='cursor-pointer'>Log out</div>
  )
}

export default SignoutBtn