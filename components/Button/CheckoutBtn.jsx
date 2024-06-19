'use client'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { checkoutCart } from '@/utils/APICalls'

import { loadStripe } from '@stripe/stripe-js';
import { checkoutSession } from '@/actions/server-action';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutBtn = ({ userId, productList }) => {
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
    try {
      const res = await checkoutSession({ userId, productList })
      if(res?.status){
        window.location.href = res?.url
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <Button onClick={checkoutCartFn} className='w-full mt-2 rounded-full py-0 bg-white text-[#27282a] hover:bg-white hover:text-[#27282a] font-bold'>Buy</Button>

  )
}

export default CheckoutBtn