'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { checkoutCart } from '@/utils/APICalls'

import { loadStripe } from '@stripe/stripe-js';
import { checkoutSession } from '@/actions/server-action';
import { useSession } from 'next-auth/react';
import { ReloadIcon } from '@radix-ui/react-icons';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutBtn = ({ productList }) => {
  const [isLoading, setisLoading] = useState(false)
  const data = useSession()
  const userId=data?.data?.userData?._id
  const userEmail=data?.data?.userData?.email
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  const checkoutCartFn = async () => {
    setisLoading(true)
    try {
      const res = await checkoutSession({ userId, productList,userEmail })
      if(res?.status){
        window.location.href = res?.url
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <Button onClick={checkoutCartFn} className='w-full font-bold' disabled={isLoading}>
        {
                  isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : `I'm born ready!`
                }
        </Button>

  )
}

export default CheckoutBtn