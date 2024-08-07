import React from 'react'
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

const FakeCreditCardModal = ({checkoutCartFn}) => {
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
            defaultValue="424242424242"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy className="h-4 w-4" onClick={()=>{
            copy('424242424242')
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
          <Button type="button" variant="default" className='w-full' onClick={()=>{checkoutCartFn()}}>
            Continue
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  )
}

export default FakeCreditCardModal