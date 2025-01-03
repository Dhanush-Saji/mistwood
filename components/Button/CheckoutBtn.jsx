'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { checkoutCart } from '@/utils/APICalls'

import { loadStripe } from '@stripe/stripe-js';
import { checkoutSession } from '@/actions/server-action';
import { useSession } from 'next-auth/react';
import FakeCreditCardModal from '../Modal/FakeCreditCardModal';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Copy, Loader2 } from 'lucide-react';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutBtn = ({ productList,couponCode }) => {
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
    try {
      setisLoading(true)
      const res = await checkoutSession({ userId, productList,userEmail,couponCode })
      if(res?.status){
        window.location.href = res?.url
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }finally{
      setisLoading(false)
    }
  };
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button className='w-full mt-2 rounded-md py-0 bg-white text-[#27282a] hover:bg-white hover:text-[#27282a] font-bold'>Buy</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Payment Code</DialogTitle>
        <DialogDescription>
         This is a test account, so please use this credit card number in the next payment page
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Input
            defaultValue="4242424242424242"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy className="h-4 w-4" onClick={()=>{
            copy('4242424242424242')
            toast.success('Copied successfully')
          }} />
        </Button>
      </div>
      <DialogFooter className="w-full">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className='w-full'>
            Close
          </Button>
        </DialogClose>
          <Button disabled={isLoading} type="button" variant="default" className='w-full' onClick={()=>{checkoutCartFn()}}>
            {isLoading?<>
            <Loader2 className="animate-spin" /> Please Wait
            </>:'Continue'}
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CheckoutBtn