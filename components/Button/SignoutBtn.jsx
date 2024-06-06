'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignoutBtn = () => {
  return (
    <div onClick={()=>{signOut()}} className='cursor-pointer'>Log out</div>
  )
}

export default SignoutBtn