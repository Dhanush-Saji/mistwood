'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, DialogFooter, DialogClose,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Copy } from 'lucide-react'
import { Label } from '../ui/label'
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify'
import { getCoupon } from '@/utils/APICalls'
import LoaderLogo from '../Loaders/LoaderLogo'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { changeNumberFormat } from '@/services/Formatter'

const CouponListModal = ({total=0,setcouponCodeAPI,isLoading,couponList}) => {
  const [maxSaving, setmaxSaving] = useState(0)
  const [selectedCouponId, setselectedCouponId] = useState('')
  const [tempCoupon, settempCoupon] = useState({ val: 0, id: '',title:''})
  const storeCoupon = (item) => {
    let amount = item?.type == 'percentage'?(total*item?.percent_off)/100:item?.amount_off
    let temp = {val:amount,id:item?._id,title:item?.code}
    settempCoupon(temp)
  };
  const applyCoupon = () => {
    setcouponCodeAPI(tempCoupon)
    settempCoupon({ val: 0, id: '',title:''})
  };
  const clearCoupon = () => {
    setcouponCodeAPI({ val: 0, id: '',title:''})
    settempCoupon({ val: 0, id: '',title:''})
  };
  useEffect(() => {
    if(selectedCouponId){
      couponList.forEach((item,index)=>{
        if(item?._id == selectedCouponId){
          let amount = item?.type == 'percentage'?(total*item?.percent_off)/100:item?.amount_off
          setmaxSaving(amount)
        }
      })
    }else{
      setmaxSaving(0)
      settempCoupon({ val: 0, id: '',title:'',total:'' })
    }
  }, [selectedCouponId])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={()=>{setselectedCouponId('')}} className='w-full rounded-sm py-0 max-w-[6rem] border border-gray-400' variant="outline">Apply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply Coupon</DialogTitle>
          <DialogDescription>
            Select a coupon from below
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 w-full'>
          {
            isLoading ?
              <LoaderLogo />:
              couponList?.length>0?
              <>
              <RadioGroup onValueChange={(e)=>setselectedCouponId(e)}>
              {
                couponList?.map((coupon,index)=>{
                  return (
                    <label key={index} className={`flex flex-col gap-2 cursor-pointer w-full border-2 border-dashed rounded-sm ${selectedCouponId == coupon?._id?'border-transparent bg-[#FED28C]':'border-gray-400'} border-gray-400 px-3 py-3`} onClick={()=>{
                      storeCoupon(coupon);
                      // copy(coupon.code);
                      // toast.success("Coupon code copied successfully!");
                    }}>
                      <div className='flex w-full items-center gap-2'>
                      <RadioGroupItem value={coupon?._id} />
                      <p className=' font-[600]'>{coupon?.code}</p>
                      <Copy className='text-sm text-gray-400 ml-auto' />
                      </div>
                      <p className='text-[0.8rem]'>{coupon?.des}</p>
                    </label>
                  )
                })
              }
              </RadioGroup>
              </>:
              <div></div>
        }
        </div>
        <Separator />
        <DialogFooter className="w-full !justify-between">
          <div className="flex flex-col">
            <p>Max savings:</p>
            <p className='font-[600] text-[1.2rem]'>₹{changeNumberFormat(maxSaving)}</p>
          </div>
          <div className='flex gap-2'>
          <DialogClose asChild>  
          <Button type="button" variant="secondary" className='w-fit' onClick={clearCoupon}>
            Cancel
          </Button>
          </DialogClose>
          <DialogClose asChild>  
          <Button onClick={applyCoupon} disabled={selectedCouponId == ''} type="button" variant="default" className='w-fit'>
            Continue
          </Button>
          </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default CouponListModal