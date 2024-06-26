import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import CheckoutBtn from '../Button/CheckoutBtn'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Copy } from "lucide-react"
import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard';

const CheckoutVerification = ({ productList }) => {
    const copyFn = () => {
        toast.success('Copied to clipboard')
        copy('4242424242424242');
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full mt-2 rounded-full py-0 bg-white text-[#27282a] hover:bg-white hover:text-[#27282a] font-bold'>Checkout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Payment Info</DialogTitle>
                    <DialogDescription>
                        Please enter the 'magic' card number <span className='font-bold'>4242 4242 4242 4242</span> at the time of payment instead of your actual card details.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            defaultValue="4242 4242 4242 4242"
                            readOnly
                        />
                    </div>
                    <Button onClick={copyFn} size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className='w-full'>
                            Close
                        </Button>
                    </DialogClose>
                    <CheckoutBtn productList={productList} />
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CheckoutVerification