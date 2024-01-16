import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { AlignLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { DarkModeToggle } from './DarkModeToggle'
import { Separator } from './ui/separator'

const MobileNavbar = () => {
  return (
    <Sheet>
  <SheetTrigger><AlignLeft className='text-[#27282a]' /></SheetTrigger>
  <SheetContent className='bg-white dark:bg-[#313131]'>
    <SheetHeader>
      <SheetDescription>
      </SheetDescription>
    </SheetHeader>
      <DarkModeToggle />
    <div className='flex flex-col items-center mt-5 gap-2'>
    <Link href={'/'}>
        <h1 className='text-[#27282a] dark:text-[#919191] text-lg'>Profile</h1>
        </Link>
        <Separator className='dark:bg-[#919191]' />
        <Link href={'/'}>
        <h1 className='text-[#27282a] dark:text-[#919191] text-lg'>Shop</h1>
        </Link>
        <Separator className='dark:bg-[#919191]' />
        <Link href={'/'}>
        <h1 className='text-[#27282a] dark:text-[#919191] text-lg'>Contact</h1>
        </Link>
        <Separator className='dark:bg-[#919191]' />
          <SheetClose asChild className='mt-auto'>
            <Button className='w-full'>Log Out</Button>
          </SheetClose>
    </div>
  </SheetContent>
</Sheet>
  )
}

export default MobileNavbar