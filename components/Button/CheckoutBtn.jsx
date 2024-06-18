'use client'
import React from 'react'
import { Button } from '../ui/button'
import { checkoutCart } from '@/utils/APICalls'

const CheckoutBtn = ({userId,productList}) => {
    const checkoutCartFn = async () => {
        try {
            const res = await checkoutCart({userId,productList})
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <Button onClick={checkoutCartFn} className='w-full mt-2 rounded-full py-0 bg-white text-[#27282a] hover:bg-white hover:text-[#27282a] font-bold'>Buy</Button>
  )
}

export default CheckoutBtn