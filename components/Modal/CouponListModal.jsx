'use client'
import React, { useEffect, useState } from 'react'
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,DialogFooter,DialogClose,
    DialogTrigger, } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Copy } from 'lucide-react'
import { Label } from '../ui/label'
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify'
import { getCoupon } from '@/utils/APICalls'

const CouponListModal = async() => {
  const [couponList, setcouponList] = useState([])
  const getCouponFn = async () => {
    try {
      const res = await getCoupon()
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button onClick={getCouponFn} className='w-full rounded-sm py-0 max-w-[6rem] border border-gray-400' variant="outline">Apply</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Apply Coupon</DialogTitle>
        <DialogDescription>
         Select a coupon from below
        </DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-2'>

      </div>
      <DialogFooter className="w-full">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className='w-full'>
            Close
          </Button>
        </DialogClose>
          <Button type="button" variant="default" className='w-full'>
            Continue
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  )
}

export default CouponListModal