'use client'
import { useUserStore } from '@/lib/zustandStore'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const LoginCartUpdationSection = () => {
    const addToCart = useUserStore(state => state.addToCart)
    const { data: sessionData, status } = useSession()
    console.log('sessionData',sessionData,status);
    useEffect(() => {
        useUserStore.persist.rehydrate()
        }, [])
        useEffect(()=>{
            if(sessionData && sessionData?.userData){
            console.log('cart fn');
            addToCart(sessionData?.userData?.cart || [])
        }
      },sessionData)
  return (
    <></>
  )
}

export default LoginCartUpdationSection