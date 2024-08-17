import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { AlignLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { DarkModeToggle } from './DarkModeToggle'
import { Separator } from './ui/separator'
import SignoutBtn from './Button/SignoutBtn'
import SignoutBtn1 from './Button/SignoutBtn1'

const MobileNavbar = () => {
  return (
    <Sheet>
  <SheetTrigger>
    <AlignLeft className='text-[#27282a] dark:text-white' />
    </SheetTrigger>
  <SheetContent className='bg-white dark:bg-[#313131] z-[10000]'>
    <SheetHeader>
      <SheetDescription>
      </SheetDescription>
    </SheetHeader>
      <DarkModeToggle />
    <div className='flex flex-col items-center mt-5 gap-2'>
        <Separator className='dark:bg-[#919191]' />
        <SheetClose asChild>
        <Link href={'/shop'}>
        <h1 className='text-[#27282a] dark:text-[#919191] text-lg'>Shop</h1>
        </Link>
        </SheetClose>
        <SheetClose asChild>
        <Link href={'/orders'}>
        <h1 className='text-[#27282a] dark:text-[#919191] text-lg'>Orders</h1>
        </Link>
        </SheetClose>
        <Separator className='dark:bg-[#919191]' />
          <SheetClose asChild className='mt-auto'>
            <SignoutBtn1 />
          </SheetClose>
    </div>
  </SheetContent>
</Sheet>
  )
}

export default MobileNavbar